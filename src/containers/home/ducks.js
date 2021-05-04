import { call, fork, put, takeLatest } from 'redux-saga/effects';
import * as api from './api';

export const HOME_PRD_TYPE_GET_REQUEST = 'app/home/PRD_TYPE_GET_REQUEST';
export const HOME_PRD_TYPE_GET_LOADING = 'app/home/PRD_TYPE_GET_LOADING';
export const HOME_PRD_TYPE_GET_SUCCESS = 'app/home/PRD_TYPE_GET_SUCCESS';
export const HOME_PRD_TYPE_GET_FAILURE = 'app/home/PRD_TYPE_GET_FAILURE';

export const HOME_CONTACT_REQUEST = 'app/home/CONTACT_REQUEST';
export const HOME_CONTACT_LOADING = 'app/home/CONTACT_LOADING';
export const HOME_CONTACT_SUCCESS = 'app/home/CONTACT_SUCCESS';
export const HOME_CONTACT_FAILURE = 'app/home/CONTACT_FAILURE';
export const HOME_CONTACT_RESET = 'app/home/CONTACT_RESET';

const INITIAL_STATE = {
  contactError: false,
  contactLoading: false,
  contactSuccess: false,
  products: [],
  productsLoading: false,
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case HOME_PRD_TYPE_GET_LOADING:
      return {
        ...state,
        productsLoading: payload,
      };

    case HOME_PRD_TYPE_GET_SUCCESS:
      return {
        ...state,
        products: payload,
      };

    case HOME_PRD_TYPE_GET_FAILURE:
      return {
        ...state,
        products: [],
        productsLoading: false,
      };

    case HOME_CONTACT_LOADING:
      return {
        ...state,
        contactLoading: payload,
      };

    case HOME_CONTACT_SUCCESS:
      return {
        ...state,
        contactSuccess: payload,
        contactError: false,
      };

    case HOME_CONTACT_FAILURE:
      return {
        ...state,
        contactError: payload,
        contactSuccess: false,
      };

    case HOME_CONTACT_RESET:
      return {
        ...state,
        contactError: INITIAL_STATE.contactError,
        contactLoading: INITIAL_STATE.contactLoading,
        contactSuccess: INITIAL_STATE.contactSuccess,
      };

    default:
      return state;
  }
};

export function fetchProductTypes() {
  return { type: HOME_PRD_TYPE_GET_REQUEST };
}

export function sendContact(payload) {
  return { type: HOME_CONTACT_REQUEST, payload };
}

export function resetContact() {
  return { type: HOME_CONTACT_RESET };
}

function* fetchProductTypesSaga() {
  try {
    yield put({ type: HOME_PRD_TYPE_GET_LOADING, payload: true });
    const {
      data: { data },
    } = yield call(api.fetchProductTypes);

    yield put({
      type: HOME_PRD_TYPE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: HOME_PRD_TYPE_GET_FAILURE, payload: true });
  } finally {
    yield put({ type: HOME_PRD_TYPE_GET_LOADING, payload: false });
  }
}

function* sendContactSaga({ payload: { values, resolve, reject } }) {
  try {
    yield put({ type: HOME_CONTACT_LOADING, payload: true });
    const { data } = yield call(api.sendContact, values);

    if (data?.success) {
      yield put({ type: HOME_CONTACT_SUCCESS, payload: true });
      resolve();
    }
  } catch (error) {
    yield put({ type: HOME_CONTACT_FAILURE, payload: true });
    reject();
  } finally {
    yield put({ type: HOME_CONTACT_LOADING, payload: false });
  }
}

function* watchFetchProductTypes() {
  yield takeLatest(HOME_PRD_TYPE_GET_REQUEST, fetchProductTypesSaga);
}

function* watchSendContact() {
  yield takeLatest(HOME_CONTACT_REQUEST, sendContactSaga);
}

export const homeSagas = [fork(watchFetchProductTypes), fork(watchSendContact)];
