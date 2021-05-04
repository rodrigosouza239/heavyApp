import { PROFILE_UPDATE_SUCCESS } from '@containers/profile/ducks';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import * as api from './api';

export const LOGIN_REQUEST = 'app/auth/LOGIN_REQUEST';
export const LOGIN_LOADING = 'app/auth/LOGIN_LOADING';
export const LOGIN_SUCCESS = 'app/auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'app/auth/LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'app/auth/LOGOUT_REQUEST';
export const LOGOUT_LOADING = 'app/auth/LOGOUT_LOADING';
export const LOGOUT_SUCCESS = 'app/auth/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'app/auth/LOGOUT_FAILURE';

export const REGISTER_REQUEST = 'app/auth/REGISTER_REQUEST';
export const REGISTER_LOADING = 'app/auth/REGISTER_LOADING';
export const REGISTER_SUCCESS = 'app/auth/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'app/auth/REGISTER_FAILURE';

export const REGISTER_COUNTRIES_REQUEST = 'app/auth/REGISTER_COUNTRIES_REQUEST';
export const REGISTER_COUNTRIES_LOADING = 'app/auth/REGISTER_COUNTRIES_LOADING';
export const REGISTER_COUNTRIES_SUCCESS = 'app/auth/REGISTER_COUNTRIES_SUCCESS';
export const REGISTER_COUNTRIES_FAILURE = 'app/auth/REGISTER_COUNTRIES_FAILURE';

export const REGISTER_POSTAL_CODE_REQUEST = 'app/auth/REGISTER_POSTAL_CODE_REQUEST';
export const REGISTER_POSTAL_CODE_CHECKED = 'app/auth/REGISTER_POSTAL_CODE_CHECKED';
export const REGISTER_POSTAL_CODE_LOADING = 'app/auth/REGISTER_POSTAL_CODE_LOADING';
export const REGISTER_POSTAL_CODE_SUCCESS = 'app/auth/REGISTER_POSTAL_CODE_SUCCESS';
export const REGISTER_POSTAL_CODE_FAILURE = 'app/auth/REGISTER_POSTAL_CODE_FAILURE';
export const REGISTER_POSTAL_CODE_RESET = 'app/auth/REGISTER_POSTAL_CODE_RESET';

export const LOGIN_FACEBOOK_REQUEST = 'app/auth/LOGIN_FACEBOOK_REQUEST';
export const LOGIN_FACEBOOK_SUCCESS = 'app/auth/LOGIN_FACEBOOK_SUCCESS';
export const LOGIN_FACEBOOK_FAILURE = 'app/auth/LOGIN_FACEBOOK_FAILURE';

export const LOGIN_GOOGLE_REQUEST = 'app/auth/LOGIN_GOOGLE_REQUEST';
export const LOGIN_GOOGLE_SUCCESS = 'app/auth/LOGIN_GOOGLE_SUCCESS';
export const LOGIN_GOOGLE_FAILURE = 'app/auth/LOGIN_GOOGLE_FAILURE';

export const LOGIN_MICROSOFT_REQUEST = 'app/auth/LOGIN_MICROSOFT_REQUEST';
export const LOGIN_MICROSOFT_SUCCESS = 'app/auth/LOGIN_MICROSOFT_SUCCESS';
export const LOGIN_MICROSOFT_FAILURE = 'app/auth/LOGIN_MICROSOFT_FAILURE';

export const LOGIN_APPLE_REQUEST = 'app/auth/LOGIN_APPLE_REQUEST';
export const LOGIN_APPLE_SUCCESS = 'app/auth/LOGIN_APPLE_SUCCESS';
export const LOGIN_APPLE_FAILURE = 'app/auth/LOGIN_APPLE_FAILURE';

const INITIAL_STATE = {
  countries: [],
  countriesError: false,
  countriesLoading: false,
  isPostalCodeChecked: false,
  isValidPostalCode: false,
  isValidPostalCodeError: false,
  isValidPostalCodeLoading: false,
  logged: false,
  loginError: false,
  loginLoading: false,
  loginSkip: false,
  registerDone: false,
  registerError: false,
  registerLoading: false,
  user: null,
  facebookLoading: false,
  facebookError: null,
  googleLoading: false,
  googleError: null,
  microsoftLoading: false,
  microsoftError: null,
  appleLoading: false,
  appleError: null,
  socialType: null,
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case LOGIN_LOADING:
      return {
        ...state,
        loginLoading: payload,
        loginError: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.accessToken,
        user: {
          ...payload.user,
          token: payload.accessToken,
        },
        logged: true,
      };

    case LOGIN_FAILURE:
      return { ...state, loginError: payload };

    case LOGIN_FACEBOOK_REQUEST:
      return { ...state, facebookLoading: true, facebookError: null };

    case LOGIN_FACEBOOK_SUCCESS:
      return {
        ...state,
        ...payload,
        facebookLoading: false,
        facebookError: false,
        socialType: 'facebook',
      };

    case LOGIN_FACEBOOK_FAILURE:
      return { ...state, facebookLoading: false, facebookError: true };

    case LOGIN_GOOGLE_REQUEST:
      return { ...state, googleLoading: true, googleError: null };

    case LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        ...payload,
        googleLoading: false,
        googleError: false,
        socialType: 'google',
      };

    case LOGIN_GOOGLE_FAILURE:
      return { ...state, googleLoading: false, googleError: true };

    case LOGIN_MICROSOFT_REQUEST:
      return { ...state, microsoftLoading: true, microsoftError: null };

    case LOGIN_MICROSOFT_SUCCESS:
      return {
        ...state,
        ...payload,
        microsoftLoading: false,
        microsoftError: false,
        socialType: 'microsoft',
      };

    case LOGIN_MICROSOFT_FAILURE:
      return { ...state, microsoftLoading: false, microsoftError: true };

    case LOGIN_APPLE_REQUEST:
      return { ...state, appleLoading: true, appleError: null };

    case LOGIN_APPLE_SUCCESS:
      return { ...state, ...payload, appleLoading: false, appleError: false, socialType: 'apple' };

    case LOGIN_APPLE_FAILURE:
      return { ...state, appleLoading: false, appleError: true };

    case REGISTER_LOADING:
      return {
        ...state,
        registerLoading: payload,
        registerError: false,
      };

    case REGISTER_SUCCESS:
      return { ...state, registerDone: payload };

    case REGISTER_FAILURE:
      return { ...state, registerError: payload };

    case REGISTER_COUNTRIES_LOADING:
      return {
        ...state,
        countriesLoading: payload,
      };

    case REGISTER_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: payload,
        countriesError: false,
      };

    case REGISTER_COUNTRIES_FAILURE:
      return { ...state, countries: [], countriesError: payload };

    case REGISTER_POSTAL_CODE_LOADING:
      return {
        ...state,
        isValidPostalCodeLoading: payload,
      };

    case REGISTER_POSTAL_CODE_CHECKED:
      return {
        ...state,
        isPostalCodeChecked: payload,
      };

    case REGISTER_POSTAL_CODE_SUCCESS:
      return {
        ...state,
        isValidPostalCode: payload,
        isValidPostalCodeError: false,
      };

    case REGISTER_POSTAL_CODE_FAILURE:
      return {
        ...state,
        isValidPostalCode: false,
        isValidPostalCodeError: payload,
      };

    case REGISTER_POSTAL_CODE_RESET:
      return {
        ...state,
        isValidPostalCode: false,
        isValidPostalCodeError: false,
        isValidPostalCodeLoading: false,
      };

    default:
      return state;
  }
};

export function login(data) {
  return { type: LOGIN_REQUEST, payload: data };
}

export function fetchCountries() {
  return { type: REGISTER_COUNTRIES_REQUEST };
}

export function register(data) {
  return { type: REGISTER_REQUEST, payload: data };
}

export function checkPostalCode(data) {
  return { type: REGISTER_POSTAL_CODE_REQUEST, payload: data };
}

export function resetPostalCodeValidation() {
  return { type: REGISTER_POSTAL_CODE_RESET };
}

export function logout() {
  return { type: LOGOUT_REQUEST };
}

export function facebook(data) {
  return { type: LOGIN_FACEBOOK_REQUEST, payload: data };
}

export function google(data) {
  return { type: LOGIN_GOOGLE_REQUEST, payload: data };
}

export function microsoft(data) {
  return { type: LOGIN_MICROSOFT_REQUEST, payload: data };
}

export function apple(data) {
  return { type: LOGIN_APPLE_REQUEST, payload: data };
}

function* loginSaga({ payload: { values, resolve } }) {
  try {
    yield put({ type: LOGIN_LOADING, payload: true });
    const { data } = yield call(api.login, values);

    if (resolve) {
      resolve(data);
    }

    if (data.success) {
      yield put({ type: LOGIN_SUCCESS, payload: data });
    }
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: true });
  } finally {
    yield put({ type: LOGIN_LOADING, payload: false });
  }
}

function* registerSaga({ payload: { values, resolve } }) {
  try {
    yield put({ type: REGISTER_LOADING, payload: true });

    const { data } = yield call(api.register, values);

    if (resolve) {
      resolve(data);
    }

    if (data.success) {
      yield put({ type: REGISTER_SUCCESS, payload: true });
      yield put(login({ values }));
    }
  } catch (error) {
    yield put({ type: REGISTER_FAILURE, payload: true });
  } finally {
    yield put({ type: REGISTER_LOADING, payload: false });
  }
}

function* fetchCountriesSaga() {
  try {
    yield put({ type: REGISTER_COUNTRIES_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.fetchCountries);

    yield put({ type: REGISTER_COUNTRIES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: REGISTER_COUNTRIES_FAILURE, payload: true });
  } finally {
    yield put({ type: REGISTER_COUNTRIES_LOADING, payload: false });
  }
}

function* checkPostalCodeSaga({ payload }) {
  try {
    yield put({ type: REGISTER_POSTAL_CODE_CHECKED, payload: false });
    yield put({ type: REGISTER_POSTAL_CODE_LOADING, payload: true });

    const { data } = yield call(api.checkPostalCode, payload);

    yield put({ type: REGISTER_POSTAL_CODE_SUCCESS, payload: data.success });
    yield put({ type: REGISTER_POSTAL_CODE_CHECKED, payload: true });
  } catch (error) {
    yield put({ type: REGISTER_POSTAL_CODE_FAILURE, payload: true });
  } finally {
    yield put({ type: REGISTER_POSTAL_CODE_LOADING, payload: false });
  }
}

function* facebookSaga({ payload: { resolve, ...rest } }) {
  try {
    const { status, data } = yield call(api.loginFacebook, rest);
    if (resolve) {
      resolve(data);
    }
    if (status === 200 && data?.success) {
      yield put({ type: LOGIN_FACEBOOK_SUCCESS, payload: data });
      yield put({ type: LOGIN_SUCCESS, payload: data });
    } else {
      yield put({ type: LOGIN_FACEBOOK_FAILURE });
    }
  } catch (error) {
    yield put({ type: LOGIN_FACEBOOK_FAILURE });
  }
}

function* googleSaga({ payload: { resolve, ...rest } }) {
  try {
    const { status, data } = yield call(api.loginGoogle, rest);
    if (resolve) {
      resolve(data);
    }
    if (status === 200 && data?.success) {
      yield put({ type: LOGIN_GOOGLE_SUCCESS, payload: data });
      yield put({ type: LOGIN_SUCCESS, payload: data });
    } else {
      yield put({ type: LOGIN_GOOGLE_FAILURE });
    }
  } catch (error) {
    yield put({ type: LOGIN_GOOGLE_FAILURE });
  }
}

function* microsoftSaga({ payload: { resolve, ...rest } }) {
  try {
    const { status, data } = yield call(api.loginMicrosoft, rest);
    if (resolve) {
      resolve(data);
    }
    if (status === 200 && data?.success) {
      yield put({ type: LOGIN_MICROSOFT_SUCCESS, payload: data });
      yield put({ type: LOGIN_SUCCESS, payload: data });
    } else {
      yield put({ type: LOGIN_MICROSOFT_FAILURE });
    }
  } catch (error) {
    yield put({ type: LOGIN_MICROSOFT_FAILURE });
  }
}

function* appleSaga({ payload: { resolve, ...rest } }) {
  try {
    const { status, data } = yield call(api.loginApple, rest);
    if (resolve) {
      resolve(data);
    }
    if (status === 200 && data?.success) {
      yield put({ type: LOGIN_APPLE_SUCCESS, payload: data });
      yield put({ type: LOGIN_SUCCESS, payload: data });
    } else {
      yield put({ type: LOGIN_APPLE_FAILURE });
    }
  } catch (error) {
    yield put({ type: LOGIN_APPLE_FAILURE });
  }
}

function* logoutSaga() {
  yield put({ type: LOGOUT_SUCCESS });
}

function* watchCheckPostalCode() {
  yield takeLatest(REGISTER_POSTAL_CODE_REQUEST, checkPostalCodeSaga);
}

function* watchFetchCountries() {
  yield takeLatest(REGISTER_COUNTRIES_REQUEST, fetchCountriesSaga);
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}

function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
}

function* watchFacebook() {
  yield takeLatest(LOGIN_FACEBOOK_REQUEST, facebookSaga);
}

function* watchGoogle() {
  yield takeLatest(LOGIN_GOOGLE_REQUEST, googleSaga);
}

function* watchMicrosoft() {
  yield takeLatest(LOGIN_MICROSOFT_REQUEST, microsoftSaga);
}

function* watchApple() {
  yield takeLatest(LOGIN_APPLE_REQUEST, appleSaga);
}

export const authSagas = [
  fork(watchCheckPostalCode),
  fork(watchFetchCountries),
  fork(watchLogin),
  fork(watchLogout),
  fork(watchRegister),
  fork(watchFacebook),
  fork(watchGoogle),
  fork(watchMicrosoft),
  fork(watchApple),
];
