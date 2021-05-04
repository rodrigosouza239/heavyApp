import { DELAY_TIME } from '@constants/';
import { all, call, delay, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as api from './api';

export const ADS_FETCH_ACTIVE_REQUEST = 'app/ads/ADS_FETCH_ACTIVE_REQUEST';
export const ADS_FETCH_ACTIVE_LOADING = 'app/ads/ADS_FETCH_ACTIVE_LOADING';
export const ADS_FETCH_ACTIVE_SUCCESS = 'app/ads/ADS_FETCH_ACTIVE_SUCCESS';

export const ADS_FETCH_INACTIVE_REQUEST = 'app/ads/ADS_FETCH_INACTIVE_REQUEST';
export const ADS_FETCH_INACTIVE_LOADING = 'app/ads/ADS_FETCH_INACTIVE_LOADING';
export const ADS_FETCH_INACTIVE_SUCCESS = 'app/ads/ADS_FETCH_INACTIVE_SUCCESS';

export const ADS_GET_AD_REQUEST = 'app/ads/ADS_GET_AD_REQUEST';
export const ADS_GET_AD_LOADING = 'app/ads/ADS_GET_AD_LOADING';
export const ADS_GET_AD_SUCCESS = 'app/ads/ADS_GET_AD_SUCCESS';

export const ADS_CHANGE_STATUS_AD_REQUEST = 'app/ads/ADS_CHANGE_STATUS_AD_REQUEST';
export const ADS_CHANGE_STATUS_AD_LOADING = 'app/ads/ADS_CHANGE_STATUS_AD_LOADING';
export const ADS_CHANGE_STATUS_AD_SUCCESS = 'app/ads/ADS_CHANGE_STATUS_AD_SUCCESS';
export const ADS_CHANGE_STATUS_AD_FAILED = 'app/ads/ADS_CHANGE_STATUS_AD_FAILED';
export const ADS_CHANGE_STATUS_AD_RESET = 'app/ads/ADS_CHANGE_STATUS_AD_RESET';

export const ADS_PRODUCT_TYPES_REQUEST = 'app/ads/PRODUCT_TYPES_REQUEST';
export const ADS_PRODUCT_TYPES_LOADING = 'app/ads/PRODUCT_TYPES_LOADING';
export const ADS_PRODUCT_TYPES_SUCCESS = 'app/ads/PRODUCT_TYPES_SUCCESS';

export const ADS_BRANDS_REQUEST = 'app/ads/BRANDS_REQUEST';
export const ADS_BRANDS_LOADING = 'app/ads/BRANDS_LOADING';
export const ADS_BRANDS_SUCCESS = 'app/ads/BRANDS_SUCCESS';

export const ADS_MODELS_REQUEST = 'app/ads/MODELs_REQUEST';
export const ADS_MODELS_LOADING = 'app/ads/MODELs_LOADING';
export const ADS_MODELS_SUCCESS = 'app/ads/MODELs_SUCCESS';

export const ADS_PLATFORMS_REQUEST = 'app/ads/PLATFORMS_REQUEST';
export const ADS_PLATFORMS_LOADING = 'app/ads/PLATFORMS_LOADING';
export const ADS_PLATFORMS_SUCCESS = 'app/ads/PLATFORMS_SUCCESS';

export const ADS_FABRICATION_YEARS_REQUEST = 'app/ads/FABRICATION_YEARS_REQUEST';
export const ADS_FABRICATION_YEARS_LOADING = 'app/ads/FABRICATION_YEARS_LOADING';
export const ADS_FABRICATION_YEARS_SUCCESS = 'app/ads/FABRICATION_YEARS_SUCCESS';

export const ADS_COUNTRIES_REQUEST = 'app/ads/COUNTRIES_REQUEST';
export const ADS_COUNTRIES_LOADING = 'app/ads/COUNTRIES_LOADING';
export const ADS_COUNTRIES_SUCCESS = 'app/ads/COUNTRIES_SUCCESS';

export const ADS_STATES_REQUEST = 'app/ads/STATES_REQUEST';
export const ADS_STATES_LOADING = 'app/ads/STATES_LOADING';
export const ADS_STATES_SUCCESS = 'app/ads/STATES_SUCCESS';

export const ADS_CITIES_REQUEST = 'app/ads/CITIES_REQUEST';
export const ADS_CITIES_LOADING = 'app/ads/CITIES_LOADING';
export const ADS_CITIES_SUCCESS = 'app/ads/CITIES_SUCCESS';

export const ADS_OPTINALS_REQUEST = 'app/ads/OPTINALS_REQUEST';
export const ADS_OPTINALS_LOADING = 'app/ads/OPTINALS_LOADING';
export const ADS_OPTINALS_SUCCESS = 'app/ads/OPTINALS_SUCCESS';

export const ADS_EXTRAS_REQUEST = 'app/ads/EXTRAS_REQUEST';
export const ADS_EXTRAS_LOADING = 'app/ads/EXTRAS_LOADING';
export const ADS_EXTRAS_SUCCESS = 'app/ads/EXTRAS_SUCCESS';

export const ADS_VEHICLE_SAVE_REQUEST = 'app/ads/VEHICLE_SAVE_REQUEST';
export const ADS_VEHICLE_SAVE_LOADING = 'app/ads/VEHICLE_SAVE_LOADING';
export const ADS_VEHICLE_SAVE_SUCCESS = 'app/ads/VEHICLE_SAVE_SUCCESS';
export const ADS_VEHICLE_SAVE_FAILED = 'app/ads/VEHICLE_SAVE_FAILED';

export const ADS_IMG_SAVE_REQUEST = 'app/ads/IMG_SAVE_REQUEST';

export const ADS_REACTIVATE_REQUEST = 'app/ads/REACTIVATE_REQUEST';
export const ADS_REACTIVATE_LOADING = 'app/ads/REACTIVATE_LOADING';
export const ADS_REACTIVATE_SUCCESS = 'app/ads/REACTIVATE_SUCCESS';
export const ADS_REACTIVATE_FAILED = 'app/ads/REACTIVATE_FAILED';
export const ADS_REACTIVATE_RESET = 'app/ads/REACTIVATE_RESET';

const INITIAL_STATE = {
  activeAds: [],
  activeAdsLoading: false,
  activeAdsPagination: null,
  ad: null,
  adLoading: false,
  brands: [],
  brandsLoading: false,
  changeStatusError: false,
  changeStatusLoading: false,
  changeStatusSuccess: false,
  cities: [],
  citiesLoading: false,
  countries: [],
  countriesLoading: false,
  extras: [],
  extrasLoading: false,
  fabricationYears: [],
  fabricationYearsLoading: false,
  inactiveAds: [],
  inactiveAdsLoading: false,
  inactiveAdsPagination: null,
  models: [],
  modelsLoading: false,
  optionals: [],
  optionalsLoading: false,
  platforms: [],
  platformsLoading: false,
  productTypes: [],
  productTypesLoading: false,
  states: [],
  statesLoading: false,
  vehicleSavingError: false,
  vehicleSavingLoading: false,
  vehicleSavingSuccess: false,
  imagesLoading: false,
  reactivateLoading: false,
  reactivateSuccess: false,
  reactivateError: false,
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case ADS_FETCH_ACTIVE_LOADING:
      return {
        ...state,
        activeAdsLoading: payload,
      };

    case ADS_FETCH_ACTIVE_SUCCESS:
      return {
        ...state,
        activeAds: payload.data,
        activeAdsPagination: payload.pagination,
      };

    case ADS_FETCH_INACTIVE_LOADING:
      return {
        ...state,
        inactiveAdsLoading: payload,
      };

    case ADS_FETCH_INACTIVE_SUCCESS:
      return {
        ...state,
        inactiveAds: payload.data,
        inactiveAdsPagination: payload.pagination,
      };

    case ADS_GET_AD_LOADING:
      return {
        ...state,
        adLoading: payload,
      };

    case ADS_GET_AD_SUCCESS:
      return {
        ...state,
        ad: payload,
      };

    case ADS_CHANGE_STATUS_AD_LOADING:
      return {
        ...state,
        changeStatusLoading: payload,
      };

    case ADS_CHANGE_STATUS_AD_SUCCESS:
      return {
        ...state,
        changeStatusError: false,
        changeStatusSuccess: payload,
      };

    case ADS_CHANGE_STATUS_AD_FAILED:
      return {
        ...state,
        changeStatusError: payload,
        changeStatusSuccess: false,
      };

    case ADS_PRODUCT_TYPES_LOADING:
      return {
        ...state,
        productTypesLoading: payload,
      };

    case ADS_PRODUCT_TYPES_SUCCESS:
      return {
        ...state,
        productTypes: payload,
      };

    case ADS_BRANDS_LOADING:
      return {
        ...state,
        brandsLoading: payload,
      };

    case ADS_BRANDS_SUCCESS:
      return {
        ...state,
        brands: payload,
      };

    case ADS_MODELS_LOADING:
      return {
        ...state,
        modelsLoading: payload,
      };

    case ADS_MODELS_SUCCESS:
      return {
        ...state,
        models: payload,
      };

    case ADS_PLATFORMS_LOADING:
      return {
        ...state,
        platformsLoading: payload,
      };

    case ADS_PLATFORMS_SUCCESS:
      return {
        ...state,
        platforms: payload,
      };

    case ADS_FABRICATION_YEARS_LOADING:
      return {
        ...state,
        fabricationYearsLoading: payload,
      };

    case ADS_FABRICATION_YEARS_SUCCESS:
      return {
        ...state,
        fabricationYears: payload,
      };

    case ADS_COUNTRIES_LOADING:
      return {
        ...state,
        countriesLoading: payload,
      };

    case ADS_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: payload,
      };

    case ADS_STATES_LOADING:
      return {
        ...state,
        statesLoading: payload,
      };

    case ADS_STATES_SUCCESS:
      return {
        ...state,
        states: payload,
      };

    case ADS_CITIES_LOADING:
      return {
        ...state,
        citiesLoading: payload,
      };

    case ADS_CITIES_SUCCESS:
      return {
        ...state,
        cities: payload,
      };

    case ADS_OPTINALS_LOADING:
      return {
        ...state,
        optionalsLoading: payload,
      };

    case ADS_OPTINALS_SUCCESS:
      return {
        ...state,
        optionals: payload.data,
        has_optionals: payload.has_optionals,
      };

    case ADS_EXTRAS_LOADING:
      return {
        ...state,
        extrasLoading: payload,
      };

    case ADS_EXTRAS_SUCCESS:
      return {
        ...state,
        extras: payload,
      };

    case ADS_VEHICLE_SAVE_LOADING:
      return {
        ...state,
        vehicleSavingLoading: payload,
        vehicleSavingSuccess: false,
        vehicleSavingError: false,
      };

    case ADS_VEHICLE_SAVE_SUCCESS:
      return {
        ...state,
        vehicleSavingSuccess: payload,
        vehicleSavingError: false,
      };

    case ADS_VEHICLE_SAVE_FAILED:
      return {
        ...state,
        vehicleSavingSuccess: false,
        vehicleSavingError: payload,
      };

    case ADS_REACTIVATE_LOADING:
      return {
        ...state,
        reactivateLoading: payload,
      };

    case ADS_REACTIVATE_SUCCESS:
      return {
        ...state,
        reactivateSuccess: payload,
        reactivateError: false,
      };

    case ADS_REACTIVATE_FAILED:
      return {
        ...state,
        reactivateSuccess: false,
        reactivateError: payload,
      };

    case ADS_REACTIVATE_RESET:
      return {
        ...state,
        reactivateLoading: false,
        reactivateSuccess: false,
        reactivateError: false,
      };

    default:
      return state;
  }
};

export function fetchActiveAds(data) {
  return { type: ADS_FETCH_ACTIVE_REQUEST, payload: data };
}

export function fetchInactiveAds(data) {
  return { type: ADS_FETCH_INACTIVE_REQUEST, payload: data };
}

export function getAdByVehicleId(data) {
  return { type: ADS_GET_AD_REQUEST, payload: data };
}

export function changeAdStatus(data) {
  return { type: ADS_CHANGE_STATUS_AD_REQUEST, payload: data };
}

export function changeAdStatusReset() {
  return { type: ADS_CHANGE_STATUS_AD_RESET };
}

export function fetchProductTypes(params) {
  return { type: ADS_PRODUCT_TYPES_REQUEST, payload: params };
}

export function getBrandsByProductId(params) {
  return { type: ADS_BRANDS_REQUEST, payload: params };
}

export function getModelsByBrandId(params) {
  return { type: ADS_MODELS_REQUEST, payload: params };
}

export function getPlatformsByModelId(params) {
  return { type: ADS_PLATFORMS_REQUEST, payload: params };
}

export function getFabricationYearsByModelId(params) {
  return { type: ADS_FABRICATION_YEARS_REQUEST, payload: params };
}

export function fetchCountries() {
  return { type: ADS_COUNTRIES_REQUEST };
}

export function getStatesByCountryId(params) {
  return { type: ADS_STATES_REQUEST, payload: params };
}

export function getCitiesByStateId(params) {
  return { type: ADS_CITIES_REQUEST, payload: params };
}

export function getOptionalsByProductId(params) {
  return { type: ADS_OPTINALS_REQUEST, payload: params };
}

export function fetchExtras(params) {
  return { type: ADS_EXTRAS_REQUEST, payload: params };
}

export function saveAd(params) {
  return { type: ADS_VEHICLE_SAVE_REQUEST, payload: params };
}

export function saveImage(params) {
  return { type: ADS_IMG_SAVE_REQUEST, payload: params };
}

export function sendReactivate(params) {
  return { type: ADS_REACTIVATE_REQUEST, payload: params };
}

export function resetReactivate() {
  return { type: ADS_REACTIVATE_RESET };
}

function* fetchActiveAdsSaga({ payload }) {
  try {
    yield put({ type: ADS_FETCH_ACTIVE_LOADING, payload: true });
    const { data } = yield call(api.fetchVehicles, payload);
    const activeAds = yield select((state) => state.ads.activeAds);

    const { restartPagination } = payload;

    yield put({
      type: ADS_FETCH_ACTIVE_SUCCESS,
      payload: {
        data: restartPagination ? data?.data : [...activeAds, ...data?.data],
        pagination: data?.metadata?.pagination,
      },
    });
  } catch (error) {
    yield put({
      type: ADS_FETCH_ACTIVE_SUCCESS,
      payload: {
        data: [],
      },
    });
  } finally {
    yield put({ type: ADS_FETCH_ACTIVE_LOADING, payload: false });
  }
}

function* fetchInactiveAdsSaga({ payload }) {
  try {
    yield put({ type: ADS_FETCH_INACTIVE_LOADING, payload: true });
    const { data } = yield call(api.fetchVehicles, payload);
    const inactiveAds = yield select((state) => state.ads.inactiveAds);

    const { restartPagination } = payload;

    yield put({
      type: ADS_FETCH_INACTIVE_SUCCESS,
      payload: {
        data: restartPagination ? data?.data : [...inactiveAds, ...data?.data],
        pagination: data?.metadata?.pagination,
      },
    });
  } catch (error) {
    yield put({
      type: ADS_FETCH_INACTIVE_SUCCESS,
      payload: [],
    });
  } finally {
    yield put({ type: ADS_FETCH_INACTIVE_LOADING, payload: false });
  }
}

function* getAdByVehicleIdSaga({ payload }) {
  try {
    yield put({ type: ADS_GET_AD_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getAdByVehicleId, payload);

    yield put({
      type: ADS_GET_AD_SUCCESS,
      payload: {
        ...data,
        price: data.price,
      },
    });
  } catch (error) {
    yield put({
      type: ADS_GET_AD_SUCCESS,
      payload: null,
    });
  } finally {
    yield put({ type: ADS_GET_AD_LOADING, payload: false });
  }
}

function* changeAdStatusSaga({ payload }) {
  const { vehicle_id } = payload;

  try {
    yield put({ type: ADS_CHANGE_STATUS_AD_LOADING, payload: true });
    yield call(api.changeAdStatus, payload);
    yield put({
      type: ADS_CHANGE_STATUS_AD_SUCCESS,
      payload: true,
    });
  } catch (error) {
    yield put({
      type: ADS_CHANGE_STATUS_AD_FAILED,
      payload: true,
    });
  } finally {
    yield put(getAdByVehicleId(vehicle_id));
    yield put({ type: ADS_CHANGE_STATUS_AD_LOADING, payload: false });
  }
}

function* saveAdSaga({ payload }) {
  try {
    yield put({ type: ADS_VEHICLE_SAVE_LOADING, payload: true });

    const { id: user_id } = yield select((state) => state.auth.user);

    yield call(api.saveAd, { ...payload, user_id });

    yield put({ type: ADS_VEHICLE_SAVE_LOADING, payload: false });

    yield delay(DELAY_TIME.default);

    yield put({ type: ADS_VEHICLE_SAVE_SUCCESS, payload: true });
  } catch (error) {
    yield put({ type: ADS_VEHICLE_SAVE_FAILED, payload: true });
  } finally {
    yield put({ type: ADS_VEHICLE_SAVE_LOADING, payload: false });
  }
}

function* fetchProductTypesSaga({ payload }) {
  try {
    yield put({ type: ADS_PRODUCT_TYPES_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.fetchProductTypes, payload);

    yield put({ type: ADS_PRODUCT_TYPES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ADS_PRODUCT_TYPES_SUCCESS, payload: [] });
  } finally {
    yield put({ type: ADS_PRODUCT_TYPES_LOADING, payload: false });
  }
}

function* getBrandsByProductIdSaga({ payload }) {
  try {
    yield put({ type: ADS_BRANDS_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getBrandsByProductId, payload);

    yield put({ type: ADS_BRANDS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ADS_BRANDS_SUCCESS, payload: [] });
  } finally {
    yield put({ type: ADS_BRANDS_LOADING, payload: false });
  }
}

function* getModelsByBrandIdSaga({ payload }) {
  try {
    yield put({ type: ADS_MODELS_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getModelsByBrandId, payload);

    yield put({ type: ADS_MODELS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ADS_MODELS_SUCCESS, payload: [] });
  } finally {
    yield put({ type: ADS_MODELS_LOADING, payload: false });
  }
}

function* getPlatformsByModelIdSaga({ payload }) {
  try {
    yield put({ type: ADS_PLATFORMS_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getPlatformsByModelId, payload);

    yield put({ type: ADS_PLATFORMS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ADS_PLATFORMS_SUCCESS, payload: [] });
  } finally {
    yield put({ type: ADS_PLATFORMS_LOADING, payload: false });
  }
}

function* getFabricationYearsByModelIdSaga({ payload }) {
  try {
    yield put({ type: ADS_FABRICATION_YEARS_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getFabricationYearsByModelId, payload);

    yield put({ type: ADS_FABRICATION_YEARS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ADS_FABRICATION_YEARS_SUCCESS, payload: [] });
  } finally {
    yield put({ type: ADS_FABRICATION_YEARS_LOADING, payload: false });
  }
}

function* fetchCountriesSaga() {
  try {
    yield put({ type: ADS_COUNTRIES_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.fetchCountries);

    yield put({ type: ADS_COUNTRIES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ADS_COUNTRIES_SUCCESS, payload: [] });
  } finally {
    yield put({ type: ADS_COUNTRIES_LOADING, payload: false });
  }
}

function* getStatesByCountryIdSaga({ payload }) {
  try {
    yield put({ type: ADS_STATES_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getStatesByCountryId, payload);

    yield put({ type: ADS_STATES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ADS_STATES_SUCCESS, payload: [] });
  } finally {
    yield put({ type: ADS_STATES_LOADING, payload: false });
  }
}

function* getCitiesByStateIdSaga({ payload }) {
  try {
    yield put({ type: ADS_CITIES_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getCitiesByStateId, payload);

    yield put({ type: ADS_CITIES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ADS_CITIES_SUCCESS, payload: [] });
  } finally {
    yield put({ type: ADS_CITIES_LOADING, payload: false });
  }
}

function* getOptionalsByProductIdSaga({ payload }) {
  try {
    yield put({ type: ADS_OPTINALS_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getOptionalsByProductId, payload);

    yield put({
      type: ADS_OPTINALS_SUCCESS,
      payload: { data, has_optionals: Array.isArray(data) && data.length > 0 },
    });
  } catch (error) {
    yield put({
      type: ADS_OPTINALS_SUCCESS,
      payload: { data: [], has_optionals: false },
    });
  } finally {
    yield put({ type: ADS_OPTINALS_LOADING, payload: false });
  }
}

function* fetchExtrasSaga({ payload }) {
  try {
    yield put({ type: ADS_EXTRAS_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.fetchExtras, payload);

    yield put({ type: ADS_EXTRAS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ADS_EXTRAS_SUCCESS, payload: [] });
  } finally {
    yield put({ type: ADS_EXTRAS_LOADING, payload: false });
  }
}

function* saveImageSaga({ payload }) {
  try {
    yield put({ type: ADS_VEHICLE_SAVE_LOADING, payload: true });

    const { imagesToAdd, imagesToDelete } = payload;

    yield all(
      imagesToDelete.map((image) => {
        return call(api.deleteImageById, image.id);
      }),
    );

    yield all(
      imagesToDelete.map((image) => {
        return call(api.deleteImageById, image.id);
      }),
    );

    yield all(
      imagesToAdd.map((image) => {
        return call(api.saveImage, image);
      }),
    );

    yield delay(DELAY_TIME.default);

    yield put({ type: ADS_VEHICLE_SAVE_SUCCESS, payload: true });
  } catch (error) {
    yield put({ type: ADS_VEHICLE_SAVE_FAILED, payload: true });
  } finally {
    yield put({ type: ADS_VEHICLE_SAVE_LOADING, payload: false });
  }
}

function* sendReactivateSaga({ payload }) {
  try {
    yield put({ type: ADS_REACTIVATE_LOADING, payload: true });

    const { data } = yield call(api.askReactivation, payload);

    yield put({ type: ADS_REACTIVATE_LOADING, payload: false });

    yield delay(DELAY_TIME.default);
    if (data?.success) {
      yield put({ type: ADS_REACTIVATE_SUCCESS, payload: true });
    } else {
      yield put({ type: ADS_REACTIVATE_FAILED, payload: true });
    }
  } catch (error) {
    yield put({ type: ADS_REACTIVATE_FAILED, payload: true });
  } finally {
    yield put({ type: ADS_REACTIVATE_LOADING, payload: false });
  }
}

function* watchFetchActiveAds() {
  yield takeLatest(ADS_FETCH_ACTIVE_REQUEST, fetchActiveAdsSaga);
}

function* watchFetchInactiveAds() {
  yield takeLatest(ADS_FETCH_INACTIVE_REQUEST, fetchInactiveAdsSaga);
}

function* watchGetAdByVehicleId() {
  yield takeLatest(ADS_GET_AD_REQUEST, getAdByVehicleIdSaga);
}

function* watchChangeAdStatus() {
  yield takeLatest(ADS_CHANGE_STATUS_AD_REQUEST, changeAdStatusSaga);
}

function* watchAdFetchProductTypes() {
  yield takeLatest(ADS_PRODUCT_TYPES_REQUEST, fetchProductTypesSaga);
}

function* watchAdGetBrandsByProductId() {
  yield takeLatest(ADS_BRANDS_REQUEST, getBrandsByProductIdSaga);
}

function* watchAdGetModelsByBrandId() {
  yield takeLatest(ADS_MODELS_REQUEST, getModelsByBrandIdSaga);
}

function* watchAdGetPlatformsByModelId() {
  yield takeLatest(ADS_PLATFORMS_REQUEST, getPlatformsByModelIdSaga);
}

function* watchAdGetFabricationYearsByModelId() {
  yield takeLatest(ADS_FABRICATION_YEARS_REQUEST, getFabricationYearsByModelIdSaga);
}

function* watchAdFetchCountries() {
  yield takeLatest(ADS_COUNTRIES_REQUEST, fetchCountriesSaga);
}

function* watchAdGetStatesByCountryId() {
  yield takeLatest(ADS_STATES_REQUEST, getStatesByCountryIdSaga);
}

function* watchAdGetCitiesByStateId() {
  yield takeLatest(ADS_CITIES_REQUEST, getCitiesByStateIdSaga);
}

function* watchGetOptionalsByProductId() {
  yield takeLatest(ADS_OPTINALS_REQUEST, getOptionalsByProductIdSaga);
}

function* watchFetchExtras() {
  yield takeLatest(ADS_EXTRAS_REQUEST, fetchExtrasSaga);
}

function* watchSaveAdSaga() {
  yield takeLatest(ADS_VEHICLE_SAVE_REQUEST, saveAdSaga);
}

function* watchSaveImagesSaga() {
  yield takeLatest(ADS_IMG_SAVE_REQUEST, saveImageSaga);
}

function* watchSendReactivateSaga() {
  yield takeLatest(ADS_REACTIVATE_REQUEST, sendReactivateSaga);
}

export const adsSagas = [
  fork(watchAdFetchCountries),
  fork(watchAdFetchProductTypes),
  fork(watchAdGetBrandsByProductId),
  fork(watchAdGetCitiesByStateId),
  fork(watchAdGetFabricationYearsByModelId),
  fork(watchAdGetModelsByBrandId),
  fork(watchAdGetPlatformsByModelId),
  fork(watchAdGetStatesByCountryId),
  fork(watchChangeAdStatus),
  fork(watchFetchActiveAds),
  fork(watchFetchExtras),
  fork(watchFetchInactiveAds),
  fork(watchGetAdByVehicleId),
  fork(watchGetOptionalsByProductId),
  fork(watchSaveAdSaga),
  fork(watchSaveImagesSaga),
  fork(watchSendReactivateSaga),
];
