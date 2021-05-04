import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as api from './api';

export const SEARCH_PRD_TYPE_GET_REQUEST = 'app/search/PRD_TYPE_GET_REQUEST';
export const SEARCH_PRD_TYPE_GET_LOADING = 'app/search/PRD_TYPE_GET_LOADING';
export const SEARCH_PRD_TYPE_GET_SUCCESS = 'app/search/PRD_TYPE_GET_SUCCESS';
export const SEARCH_PRD_TYPE_GET_FAILURE = 'app/search/PRD_TYPE_GET_FAILURE';

export const SEARCH_BRANDS_GET_REQUEST = 'app/search/BRANDS_GET_REQUEST';
export const SEARCH_BRANDS_GET_LOADING = 'app/search/BRANDS_GET_LOADING';
export const SEARCH_BRANDS_GET_SUCCESS = 'app/search/BRANDS_GET_SUCCESS';
export const SEARCH_BRANDS_GET_FAILURE = 'app/search/BRANDS_GET_FAILURE';

export const SEARCH_MODELS_GET_REQUEST = 'app/search/MODELS_GET_REQUEST';
export const SEARCH_MODELS_GET_LOADING = 'app/search/MODELS_GET_LOADING';
export const SEARCH_MODELS_GET_SUCCESS = 'app/search/MODELS_GET_SUCCESS';
export const SEARCH_MODELS_GET_FAILURE = 'app/search/MODELS_GET_FAILURE';

export const SEARCH_YEARS_GET_REQUEST = 'app/search/YEARS_GET_REQUEST';
export const SEARCH_YEARS_GET_LOADING = 'app/search/YEARS_GET_LOADING';
export const SEARCH_YEARS_GET_SUCCESS = 'app/search/YEARS_GET_SUCCESS';
export const SEARCH_YEARS_GET_FAILURE = 'app/search/YEARS_GET_FAILURE';

export const SEARCH_STATES_GET_REQUEST = 'app/search/STATES_GET_REQUEST';
export const SEARCH_STATES_GET_LOADING = 'app/search/STATES_GET_LOADING';
export const SEARCH_STATES_GET_SUCCESS = 'app/search/STATES_GET_SUCCESS';
export const SEARCH_STATES_GET_FAILURE = 'app/search/STATES_GET_FAILURE';

export const SEARCH_CITIES_GET_REQUEST = 'app/search/CITIES_GET_REQUEST';
export const SEARCH_CITIES_GET_LOADING = 'app/search/CITIES_GET_LOADING';
export const SEARCH_CITIES_GET_SUCCESS = 'app/search/CITIES_GET_SUCCESS';
export const SEARCH_CITIES_GET_FAILURE = 'app/search/CITIES_GET_FAILURE';

export const SEARCH_PRD_GET_REQUEST = 'app/search/PRD_GET_REQUEST';
export const SEARCH_PRD_GET_LOADING = 'app/search/PRD_GET_LOADING';
export const SEARCH_PRD_GET_SUCCESS = 'app/search/PRD_GET_SUCCESS';
export const SEARCH_PRD_GET_RESET = 'app/search/PRD_GET_RESET';

export const SEARCH_GET_AD_REQUEST = 'app/search/SEARCH_GET_AD_REQUEST';
export const SEARCH_GET_AD_LOADING = 'app/search/SEARCH_GET_AD_LOADING';
export const SEARCH_GET_AD_SUCCESS = 'app/search/SEARCH_GET_AD_SUCCESS';
export const SEARCH_AD_RESET = 'app/search/SEARCH_AD_RESET';

export const SEARCH_CHAT_EVENT_REQUEST = 'app/search/SEARCH_CHAT_EVENT_REQUEST';
export const SEARCH_CHAT_EVENT_LOADING = 'app/search/SEARCH_CHAT_EVENT_LOADING';
export const SEARCH_CHAT_EVENT_SUCCESS = 'app/search/SEARCH_CHAT_EVENT_SUCCESS';
export const SEARCH_CHAT_EVENT_FAILURE = 'app/search/SEARCH_CHAT_EVENT_FAILURE';
export const SEARCH_CHAT_EVENT_RESET = 'app/search/SEARCH_CHAT_EVENT_RESET';

export const SEARCH_COUNTRIES_GET_REQUEST = 'app/search/SEARCH_COUNTRIES_GET_REQUEST';
export const SEARCH_COUNTRIES_GET_LOADING = 'app/search/SEARCH_COUNTRIES_GET_LOADING';
export const SEARCH_COUNTRIES_GET_SUCCESS = 'app/search/SEARCH_COUNTRIES_GET_SUCCESS';
export const SEARCH_COUNTRIES_GET_FAILURE = 'app/search/SEARCH_COUNTRIES_GET_FAILURE';

const INITIAL_STATE = {
  filters: null,
  ad: null,
  adLoading: true,
  brands: [],
  brandsLoading: false,
  cities: [],
  citiesLoading: false,
  models: [],
  modelsLoading: false,
  products: [],
  productsLoading: false,
  results: [],
  resultsLoading: false,
  resultsPagination: null,
  states: [],
  statesLoading: false,
  years: [],
  yearsLoading: false,
  chatSuccess: null,
  chatLoading: false,
  chatError: false,

  countries: [],
  countriesLoading: false,
  countriesError: false,
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case SEARCH_PRD_TYPE_GET_LOADING:
      return {
        ...state,
        productsLoading: payload,
      };

    case SEARCH_PRD_TYPE_GET_SUCCESS:
      return {
        ...state,
        products: payload,
      };

    case SEARCH_PRD_TYPE_GET_FAILURE:
      return {
        ...state,
        products: [],
        productsLoading: false,
      };

    case SEARCH_BRANDS_GET_LOADING:
      return {
        ...state,
        brandsLoading: payload,
      };

    case SEARCH_BRANDS_GET_SUCCESS:
      return {
        ...state,
        brands: payload,
        models: [],
        years: [],
      };

    case SEARCH_BRANDS_GET_FAILURE:
      return {
        ...state,
        brands: [],
        brandsLoading: false,
      };

    case SEARCH_MODELS_GET_LOADING:
      return {
        ...state,
        modelsLoading: payload,
      };

    case SEARCH_MODELS_GET_SUCCESS:
      return {
        ...state,
        models: payload,
      };

    case SEARCH_MODELS_GET_FAILURE:
      return {
        ...state,
        models: [],
        modelsLoading: false,
      };

    case SEARCH_YEARS_GET_LOADING:
      return {
        ...state,
        yearsLoading: payload,
      };

    case SEARCH_YEARS_GET_SUCCESS:
      return {
        ...state,
        years: payload,
      };

    case SEARCH_YEARS_GET_FAILURE:
      return {
        ...state,
        years: [],
        yearsLoading: false,
      };

    case SEARCH_STATES_GET_LOADING:
      return {
        ...state,
        statesLoading: payload,
      };

    case SEARCH_STATES_GET_SUCCESS:
      return {
        ...state,
        states: payload,
      };

    case SEARCH_STATES_GET_FAILURE:
      return {
        ...state,
        states: [],
        statesLoading: false,
      };

    case SEARCH_CITIES_GET_LOADING:
      return {
        ...state,
        citiesLoading: payload,
      };

    case SEARCH_CITIES_GET_SUCCESS:
      return {
        ...state,
        cities: payload,
      };

    case SEARCH_CITIES_GET_FAILURE:
      return {
        ...state,
        cities: [],
        citiesLoading: false,
      };
    case SEARCH_PRD_GET_REQUEST:
      return {
        ...state,
        filters: payload?.data,
      };
    case SEARCH_PRD_GET_LOADING:
      return {
        ...state,
        resultsLoading: payload,
      };

    case SEARCH_PRD_GET_SUCCESS: {
      return {
        ...state,
        results: payload.data,
        resultsPagination: payload.pagination,
      };
    }

    case SEARCH_GET_AD_LOADING:
      return {
        ...state,
        adLoading: payload,
      };

    case SEARCH_GET_AD_SUCCESS:
      return {
        ...state,
        ad: payload,
      };

    case SEARCH_PRD_GET_RESET:
      return {
        ...state,
        results: INITIAL_STATE.results,
        resultsLoading: INITIAL_STATE.resultsLoading,
        resultsPagination: INITIAL_STATE.resultsPagination,
      };

    case SEARCH_AD_RESET: {
      return {
        ...state,
        ad: INITIAL_STATE.ad,
        adLoading: INITIAL_STATE.adLoading,
      };
    }

    case SEARCH_CHAT_EVENT_LOADING:
      return {
        ...state,
        chatLoading: payload,
      };

    case SEARCH_CHAT_EVENT_SUCCESS:
      return {
        ...state,
        chatSuccess: payload,
      };

    case SEARCH_CHAT_EVENT_FAILURE:
      return {
        ...state,
        chatError: payload,
      };

    case SEARCH_CHAT_EVENT_RESET:
      return {
        ...state,
        chatLoading: INITIAL_STATE.chatLoading,
        chatSuccess: INITIAL_STATE.chatSuccess,
        chatError: INITIAL_STATE.chatError,
      };

    case SEARCH_COUNTRIES_GET_LOADING:
      return {
        ...state,
        countriesLoading: payload,
      };

    case SEARCH_COUNTRIES_GET_SUCCESS:
      return {
        ...state,
        countries: payload,
      };

    case SEARCH_COUNTRIES_GET_FAILURE:
      return {
        ...state,
        countriesError: payload,
      };

    default:
      return state;
  }
};

export function fetchProductTypes() {
  return { type: SEARCH_PRD_TYPE_GET_REQUEST };
}

export function fetchStates(params) {
  return { type: SEARCH_STATES_GET_REQUEST, payload: params };
}

export function getBrandsByProductId(productId) {
  return { type: SEARCH_BRANDS_GET_REQUEST, payload: productId };
}

export function getModelsByBrandId(brandId) {
  return { type: SEARCH_MODELS_GET_REQUEST, payload: brandId };
}

export function getYearsByModelId(modelId) {
  return { type: SEARCH_YEARS_GET_REQUEST, payload: modelId };
}

export function getCitiesByStateId(stateId) {
  return { type: SEARCH_CITIES_GET_REQUEST, payload: stateId };
}

export function getProductsByFilter(params) {
  return { type: SEARCH_PRD_GET_REQUEST, payload: params };
}

export function resetResults() {
  return { type: SEARCH_PRD_GET_RESET };
}

export function getAdByVehicleId(data) {
  return { type: SEARCH_GET_AD_REQUEST, payload: data };
}

export function resetAd() {
  return { type: SEARCH_AD_RESET };
}

export function sendChatEvent(params) {
  return { type: SEARCH_CHAT_EVENT_REQUEST, payload: params };
}

export function sendChatEventReset() {
  return { type: SEARCH_CHAT_EVENT_RESET };
}

export function getCountries() {
  return { type: SEARCH_COUNTRIES_GET_REQUEST };
}

function* fetchProductTypesSaga() {
  try {
    yield put({ type: SEARCH_PRD_TYPE_GET_LOADING, payload: true });
    const {
      data: { data },
    } = yield call(api.fetchProductTypes);

    yield put({
      type: SEARCH_PRD_TYPE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: SEARCH_PRD_TYPE_GET_FAILURE, payload: true });
  } finally {
    yield put({ type: SEARCH_PRD_TYPE_GET_LOADING, payload: false });
  }
}

function* fetchStatesSaga({ payload }) {
  try {
    yield put({ type: SEARCH_STATES_GET_LOADING, payload: true });
    const {
      data: { data },
    } = yield call(api.fetchStates, payload);

    yield put({
      type: SEARCH_STATES_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: SEARCH_STATES_GET_FAILURE, payload: true });
  } finally {
    yield put({ type: SEARCH_STATES_GET_LOADING, payload: false });
  }
}

function* getCitiesByStateIdSaga({ payload }) {
  try {
    yield put({ type: SEARCH_CITIES_GET_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getCitiesByStateId, payload);

    yield put({
      type: SEARCH_CITIES_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: SEARCH_CITIES_GET_FAILURE, payload: true });
  } finally {
    yield put({ type: SEARCH_CITIES_GET_LOADING, payload: false });
  }
}

function* getBrandsByProductIdSaga({ payload }) {
  try {
    yield put({ type: SEARCH_BRANDS_GET_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getBrandsByProductId, payload);

    yield put({
      type: SEARCH_BRANDS_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: SEARCH_BRANDS_GET_FAILURE, payload: true });
  } finally {
    yield put({ type: SEARCH_BRANDS_GET_LOADING, payload: false });
  }
}

function* getModelsByBrandIdSaga({ payload }) {
  try {
    yield put({ type: SEARCH_MODELS_GET_LOADING, payload: true });
    const {
      data: { data },
    } = yield call(api.getModelsByBrandId, payload);

    yield put({
      type: SEARCH_MODELS_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: SEARCH_MODELS_GET_FAILURE, payload: true });
  } finally {
    yield put({ type: SEARCH_MODELS_GET_LOADING, payload: false });
  }
}

function* getYearsByModelIdSaga({ payload }) {
  try {
    yield put({ type: SEARCH_YEARS_GET_LOADING, payload: true });
    const {
      data: { data },
    } = yield call(api.getYearsByModelId, payload);

    yield put({
      type: SEARCH_YEARS_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: SEARCH_YEARS_GET_FAILURE, payload: true });
  } finally {
    yield put({ type: SEARCH_YEARS_GET_LOADING, payload: false });
  }
}

function* getProductsByFilterSaga({ payload }) {
  try {
    yield put({ type: SEARCH_PRD_GET_LOADING, payload: true });
    const results = yield select((state) => state.search.results);

    const { restartPagination } = payload;

    const { data } = yield call(api.getProductsByFilter, payload);

    yield put({
      type: SEARCH_PRD_GET_SUCCESS,
      payload: {
        data: restartPagination ? data?.data : [...results, ...data?.data],
        pagination: data?.metadata?.pagination,
      },
    });
  } catch (error) {
    yield put({
      type: SEARCH_PRD_GET_SUCCESS,
      payload: {
        data: [],
      },
    });
  } finally {
    yield put({ type: SEARCH_PRD_GET_LOADING, payload: false });
  }
}

function* getAdByVehicleIdSaga({ payload }) {
  try {
    yield put({ type: SEARCH_GET_AD_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getAdByVehicleId, payload);

    yield put({
      type: SEARCH_GET_AD_SUCCESS,
      payload: {
        ...data,
        price: data.price,
      },
    });
  } catch (error) {
    yield put({
      type: SEARCH_CHAT_EVENT_FAILURE,
      payload: null,
    });
  } finally {
    yield put({ type: SEARCH_GET_AD_LOADING, payload: false });
  }
}

function* sendChatEventSaga({ payload }) {
  try {
    yield put({ type: SEARCH_CHAT_EVENT_LOADING, payload: true });
    yield put({ type: SEARCH_CHAT_EVENT_SUCCESS, payload: false });
    yield put({ type: SEARCH_CHAT_EVENT_FAILURE, payload: false });

    const { status } = yield call(api.sendChatEvent, payload);
    if (status === 200) yield put({ type: SEARCH_CHAT_EVENT_SUCCESS, payload: true });
    else yield put({ type: SEARCH_CHAT_EVENT_FAILURE, payload: true });
  } catch (e) {
    yield put({ type: SEARCH_CHAT_EVENT_SUCCESS, payload: false });
    yield put({ type: SEARCH_CHAT_EVENT_FAILURE, payload: true });
  } finally {
    yield put({ type: SEARCH_CHAT_EVENT_LOADING, payload: false });
  }
}

function* getCountriesSaga() {
  try {
    yield put({ type: SEARCH_COUNTRIES_GET_LOADING, payload: true });
    yield put({ type: SEARCH_COUNTRIES_GET_FAILURE, payload: false });

    const { data } = yield call(api.fetchCountries);

    if (data?.success) {
      yield put({ type: SEARCH_COUNTRIES_GET_SUCCESS, payload: data.data });
    } else {
      yield put({ type: SEARCH_COUNTRIES_GET_FAILURE, payload: true });
    }
  } catch (e) {
    yield put({ type: SEARCH_COUNTRIES_GET_FAILURE, payload: true });
  } finally {
    yield put({ type: SEARCH_COUNTRIES_GET_LOADING, payload: false });
  }
}

function* watchFilterFetchProductTypes() {
  yield takeLatest(SEARCH_PRD_TYPE_GET_REQUEST, fetchProductTypesSaga);
}

function* watchFilterGetBrandsByProductId() {
  yield takeLatest(SEARCH_BRANDS_GET_REQUEST, getBrandsByProductIdSaga);
}

function* watchFilterGetModelsByBrandId() {
  yield takeLatest(SEARCH_MODELS_GET_REQUEST, getModelsByBrandIdSaga);
}

function* watchFilterGetYearsByModelId() {
  yield takeLatest(SEARCH_YEARS_GET_REQUEST, getYearsByModelIdSaga);
}

function* watchFilterGetStates() {
  yield takeLatest(SEARCH_STATES_GET_REQUEST, fetchStatesSaga);
}

function* watchFilterGetCitiesByStateId() {
  yield takeLatest(SEARCH_CITIES_GET_REQUEST, getCitiesByStateIdSaga);
}

function* watchGetProductsByFilterSaga() {
  yield takeLatest(SEARCH_PRD_GET_REQUEST, getProductsByFilterSaga);
}

function* watchGetAdByVehicleId() {
  yield takeLatest(SEARCH_GET_AD_REQUEST, getAdByVehicleIdSaga);
}

function* watchsendChatEvent() {
  yield takeLatest(SEARCH_CHAT_EVENT_REQUEST, sendChatEventSaga);
}

function* watchgetCountries() {
  yield takeLatest(SEARCH_COUNTRIES_GET_REQUEST, getCountriesSaga);
}

export const searchSagas = [
  fork(watchGetAdByVehicleId),
  fork(watchFilterFetchProductTypes),
  fork(watchFilterGetBrandsByProductId),
  fork(watchFilterGetCitiesByStateId),
  fork(watchFilterGetModelsByBrandId),
  fork(watchFilterGetStates),
  fork(watchFilterGetYearsByModelId),
  fork(watchGetProductsByFilterSaga),
  fork(watchsendChatEvent),
  fork(watchgetCountries),
];
