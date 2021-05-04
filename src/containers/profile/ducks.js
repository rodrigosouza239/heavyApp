import moment from 'moment';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import * as api from './api';

export const PROFILE_GET_REQUEST = 'app/profile/PROFILE_GET_REQUEST';
export const PROFILE_GET_LOADING = 'app/profile/PROFILE_GET_LOADING';
export const PROFILE_GET_SUCCESS = 'app/profile/PROFILE_GET_SUCCESS';
export const PROFILE_GET_FAILURE = 'app/profile/PROFILE_GET_FAILURE';

export const PROFILE_UPDATE_REQUEST = 'app/profile/PROFILE_UPDATE_REQUEST';
export const PROFILE_UPDATE_LOADING = 'app/profile/PROFILE_UPDATE_LOADING';
export const PROFILE_UPDATE_SUCCESS = 'app/profile/PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_FAILURE = 'app/profile/PROFILE_UPDATE_FAILURE';

export const PROFILE_COUNTRIES_REQUEST = 'app/profile/PROFILE_COUNTRIES_REQUEST';
export const PROFILE_COUNTRIES_LOADING = 'app/profile/PROFILE_COUNTRIES_LOADING';
export const PROFILE_COUNTRIES_SUCCESS = 'app/profile/PROFILE_COUNTRIES_SUCCESS';
export const PROFILE_COUNTRIES_FAILURE = 'app/profile/PROFILE_COUNTRIES_FAILURE';

export const PROFILE_POSTAL_CODE_REQUEST = 'app/profile/PROFILE_POSTAL_CODE_REQUEST';
export const PROFILE_POSTAL_CODE_CHECKED = 'app/profile/PROFILE_POSTAL_CODE_CHECKED';
export const PROFILE_POSTAL_CODE_LOADING = 'app/profile/PROFILE_POSTAL_CODE_LOADING';
export const PROFILE_POSTAL_CODE_SUCCESS = 'app/profile/PROFILE_POSTAL_CODE_SUCCESS';
export const PROFILE_POSTAL_CODE_FAILURE = 'app/profile/PROFILE_POSTAL_CODE_FAILURE';
export const PROFILE_POSTAL_CODE_RESET = 'app/profile/PROFILE_POSTAL_CODE_RESET';

const INITIAL_STATE_POSTAL_CODE = {
  isPostalCodeChecked: true,
  isValidPostalCode: true,
  isValidPostalCodeError: false,
  isValidPostalCodeLoading: false,
};

const INITIAL_STATE = {
  countries: [],
  countriesError: false,
  countriesLoading: false,
  ...INITIAL_STATE_POSTAL_CODE,
  userError: false,
  userLoading: false,
  userUpdatedSuccess: false,
  userUpdateError: false,
  userUpdateLoading: false,
  user: {
    email: '',
    name: '',
    user_info: {
      birth_date: '',
      document_number: '',
      document_type: 'CPF',
      genre: 'M',
      phone: '',
      postal_code: '',
    },
  },
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case PROFILE_GET_LOADING:
      return {
        ...state,
        userLoading: payload,
        userError: false,
      };

    case PROFILE_GET_SUCCESS:
      return {
        ...state,
        user: payload,
      };

    case PROFILE_GET_FAILURE:
      return { ...state, userError: payload };

    case PROFILE_UPDATE_LOADING:
      return {
        ...state,
        userUpdatedSuccess: false,
        userUpdateError: false,
        userUpdateLoading: payload,
      };

    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        userUpdatedSuccess: true,
      };

    case PROFILE_UPDATE_FAILURE:
      return { ...state, userUpdateError: payload };

    case PROFILE_COUNTRIES_LOADING:
      return {
        ...state,
        countriesLoading: payload,
      };

    case PROFILE_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: payload,
        countriesError: false,
      };

    case PROFILE_COUNTRIES_FAILURE:
      return { ...state, countries: [], countriesError: payload };

    case PROFILE_POSTAL_CODE_LOADING:
      return {
        ...state,
        isValidPostalCodeLoading: payload,
      };

    case PROFILE_POSTAL_CODE_CHECKED:
      return {
        ...state,
        isPostalCodeChecked: payload,
      };

    case PROFILE_POSTAL_CODE_SUCCESS:
      return {
        ...state,
        isValidPostalCode: payload,
        isValidPostalCodeError: false,
      };

    case PROFILE_POSTAL_CODE_FAILURE:
      return {
        ...state,
        isValidPostalCode: false,
        isValidPostalCodeError: payload,
      };

    case PROFILE_POSTAL_CODE_RESET:
      return {
        ...state,
        ...INITIAL_STATE_POSTAL_CODE,
      };

    default:
      return state;
  }
};

export function getUser(data) {
  return { type: PROFILE_GET_REQUEST, payload: data };
}

export function updateUser(data) {
  return { type: PROFILE_UPDATE_REQUEST, payload: data };
}

export function fetchCountries() {
  return { type: PROFILE_COUNTRIES_REQUEST };
}

export function checkPostalCode(data) {
  return { type: PROFILE_POSTAL_CODE_REQUEST, payload: data };
}

export function resetPostalCodeValidation() {
  return { type: PROFILE_POSTAL_CODE_RESET };
}

function* getUserSaga({ payload }) {
  try {
    yield put({ type: PROFILE_GET_LOADING, payload: true });
    const { data } = yield call(api.getUser, payload);
    const user = data?.data?.[0];
    yield put({
      type: PROFILE_GET_SUCCESS,
      payload: {
        ...user,
        user_info: {
          ...user?.user_info,
          birth_date: user?.user_info?.birth_date
            ? moment(user.user_info.birth_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
            : user?.user_info?.birth_date,
        },
      },
    });
  } catch (error) {
    yield put({ type: PROFILE_GET_FAILURE, payload: true });
  } finally {
    yield put({ type: PROFILE_GET_LOADING, payload: false });
  }
}

function* updateUserSaga({ payload: { values, resolve, update = false } }) {
  try {
    yield put({ type: PROFILE_UPDATE_LOADING, payload: true });
    const { data } = yield call(api.updateUserById, values);

    if (data.success) {
      yield put({
        type: PROFILE_UPDATE_SUCCESS,
        payload: values,
        update,
      });
    }

    if (resolve) {
      resolve(data);
    }
  } catch (error) {
    yield put({ type: PROFILE_UPDATE_FAILURE, payload: true });
  } finally {
    yield put({ type: PROFILE_UPDATE_LOADING, payload: false });
  }
}

function* fetchCountriesSaga() {
  try {
    yield put({ type: PROFILE_COUNTRIES_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.fetchCountries);

    yield put({ type: PROFILE_COUNTRIES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: PROFILE_COUNTRIES_FAILURE, payload: true });
  } finally {
    yield put({ type: PROFILE_COUNTRIES_LOADING, payload: false });
  }
}

function* checkPostalCodeSaga({ payload }) {
  try {
    yield put({ type: PROFILE_POSTAL_CODE_CHECKED, payload: false });
    yield put({ type: PROFILE_POSTAL_CODE_LOADING, payload: true });

    const { data } = yield call(api.checkPostalCode, payload);

    yield put({ type: PROFILE_POSTAL_CODE_SUCCESS, payload: data.success });
    yield put({ type: PROFILE_POSTAL_CODE_CHECKED, payload: true });
  } catch (error) {
    yield put({ type: PROFILE_POSTAL_CODE_FAILURE, payload: true });
  } finally {
    yield put({ type: PROFILE_POSTAL_CODE_LOADING, payload: false });
  }
}

function* watchCheckPostalCode() {
  yield takeLatest(PROFILE_POSTAL_CODE_REQUEST, checkPostalCodeSaga);
}

function* watchFetchCountries() {
  yield takeLatest(PROFILE_COUNTRIES_REQUEST, fetchCountriesSaga);
}

function* watchGetUser() {
  yield takeLatest(PROFILE_GET_REQUEST, getUserSaga);
}

function* watchUpdateUser() {
  yield takeLatest(PROFILE_UPDATE_REQUEST, updateUserSaga);
}

export const profileSagas = [
  fork(watchCheckPostalCode),
  fork(watchFetchCountries),
  fork(watchGetUser),
  fork(watchUpdateUser),
];
