import { normalizePrice, removeAllNonNumeric } from '@utils/';
import { all, call, delay, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as api from './api';

export const AD_PRODUCT_TYPES_REQUEST = 'app/ad/PRODUCT_TYPES_REQUEST';
export const AD_PRODUCT_TYPES_LOADING = 'app/ad/PRODUCT_TYPES_LOADING';
export const AD_PRODUCT_TYPES_SUCCESS = 'app/ad/PRODUCT_TYPES_SUCCESS';

export const AD_BRANDS_REQUEST = 'app/ad/BRANDS_REQUEST';
export const AD_BRANDS_LOADING = 'app/ad/BRANDS_LOADING';
export const AD_BRANDS_SUCCESS = 'app/ad/BRANDS_SUCCESS';

export const AD_MODELS_REQUEST = 'app/ad/MODELs_REQUEST';
export const AD_MODELS_LOADING = 'app/ad/MODELs_LOADING';
export const AD_MODELS_SUCCESS = 'app/ad/MODELs_SUCCESS';

export const AD_PLATFORMS_REQUEST = 'app/ad/PLATFORMS_REQUEST';
export const AD_PLATFORMS_LOADING = 'app/ad/PLATFORMS_LOADING';
export const AD_PLATFORMS_SUCCESS = 'app/ad/PLATFORMS_SUCCESS';

export const AD_FABRICATION_YEARS_REQUEST = 'app/ad/FABRICATION_YEARS_REQUEST';
export const AD_FABRICATION_YEARS_LOADING = 'app/ad/FABRICATION_YEARS_LOADING';
export const AD_FABRICATION_YEARS_SUCCESS = 'app/ad/FABRICATION_YEARS_SUCCESS';

export const AD_COUNTRIES_REQUEST = 'app/ad/COUNTRIES_REQUEST';
export const AD_COUNTRIES_LOADING = 'app/ad/COUNTRIES_LOADING';
export const AD_COUNTRIES_SUCCESS = 'app/ad/COUNTRIES_SUCCESS';

export const AD_STATES_REQUEST = 'app/ad/STATES_REQUEST';
export const AD_STATES_LOADING = 'app/ad/STATES_LOADING';
export const AD_STATES_SUCCESS = 'app/ad/STATES_SUCCESS';

export const AD_CITIES_REQUEST = 'app/ad/CITIES_REQUEST';
export const AD_CITIES_LOADING = 'app/ad/CITIES_LOADING';
export const AD_CITIES_SUCCESS = 'app/ad/CITIES_SUCCESS';

export const AD_OPTINALS_REQUEST = 'app/ad/OPTINALS_REQUEST';
export const AD_OPTINALS_LOADING = 'app/ad/OPTINALS_LOADING';
export const AD_OPTINALS_SUCCESS = 'app/ad/OPTINALS_SUCCESS';

export const AD_EXTRAS_REQUEST = 'app/ad/EXTRAS_REQUEST';
export const AD_EXTRAS_LOADING = 'app/ad/EXTRAS_LOADING';
export const AD_EXTRAS_SUCCESS = 'app/ad/EXTRAS_SUCCESS';

export const AD_PLANS_REQUEST = 'app/ad/PLANS_REQUEST';
export const AD_PLANS_LOADING = 'app/ad/PLANS_LOADING';
export const AD_PLANS_SUCCESS = 'app/ad/PLANS_SUCCESS';

export const AD_PAY_PLAN_REQUEST = 'app/ad/PAY_PLAN_REQUEST';
export const AD_PAY_PLAN_LOADING = 'app/ad/PAY_PLAN_LOADING';
export const AD_PAY_PLAN_SUCCESS = 'app/ad/PAY_PLAN_SUCCESS';
export const AD_PAY_PLAN_FAILED = 'app/ad/PAY_PLAN_FAILED';

export const AD_VEHICLE_SAVE_REQUEST = 'app/ad/VEHICLE_SAVE_REQUEST';
export const AD_VEHICLE_SAVE_LOADING = 'app/ad/VEHICLE_SAVE_LOADING';
export const AD_VEHICLE_SAVE_SUCCESS = 'app/ad/VEHICLE_SAVE_SUCCESS';
export const AD_VEHICLE_SAVE_FAILED = 'app/ad/VEHICLE_SAVE_FAILED';

export const AD_POSTAL_CODE_REQUEST = 'app/auth/POSTAL_CODE_REQUEST';
export const AD_POSTAL_CODE_CHECKED = 'app/auth/POSTAL_CODE_CHECKED';
export const AD_POSTAL_CODE_LOADING = 'app/auth/POSTAL_CODE_LOADING';
export const AD_POSTAL_CODE_SUCCESS = 'app/auth/POSTAL_CODE_SUCCESS';
export const AD_POSTAL_CODE_FAILURE = 'app/auth/POSTAL_CODE_FAILURE';
export const AD_POSTAL_CODE_RESET = 'app/auth/POSTAL_CODE_RESET';

export const AD_INITIAL_VALUES_UPDATE = 'app/ad/INITIAL_VALUES_UPDATE';
export const AD_RESET_VALUES = 'app/ad/RESET_VALUES';

const INITIAL_STATE = {
  brands: [],
  brandsLoading: false,
  cities: [],
  citiesLoading: false,
  countries: [],
  countriesLoading: false,
  extras: [],
  extrasLoading: false,
  fabricationYears: [],
  fabricationYearsLoading: false,
  models: [],
  modelsLoading: false,
  optionals: [],
  optionalsLoading: false,
  plans: [],
  plansLoading: false,
  platforms: [],
  platformsLoading: false,
  productTypes: [],
  productTypesLoading: false,
  states: [],
  statesLoading: false,
  vehicleLoading: false,
  vehicleError: null,
  isPostalCodeChecked: false,
  isValidPostalCode: false,
  isValidPostalCodeError: false,
  isValidPostalCodeLoading: false,
  postalCodeData: {},
  initialValues: {
    brand_id: '',
    city_id: '',
    country_id: '',
    currentStep: 1,
    description: '',
    extras: [],
    fabrication_year: '',
    has_mileage: false,
    has_motorhours: false,
    has_optionals: false,
    has_platform: true,
    has_trackhours: false,
    id: '',
    images: [],
    mileage: '',
    model_id: '',
    motorhours: '',
    optionals: [],
    plan: '',
    platform_id: '',
    price: 'R$ 0,00',
    product_id: '',
    state_id: '',
    steps_count: 11,
    totalSteps: 4,
    trackhours: '',
    user_id: '',
  },
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case AD_PRODUCT_TYPES_LOADING:
      return {
        ...state,
        productTypesLoading: payload,
      };

    case AD_PRODUCT_TYPES_SUCCESS:
      return {
        ...state,
        productTypes: payload,
      };

    case AD_BRANDS_LOADING:
      return {
        ...state,
        brandsLoading: payload,
      };

    case AD_BRANDS_SUCCESS:
      return {
        ...state,
        brands: payload,
      };

    case AD_MODELS_LOADING:
      return {
        ...state,
        modelsLoading: payload,
      };

    case AD_MODELS_SUCCESS:
      return {
        ...state,
        models: payload,
      };

    case AD_PLATFORMS_LOADING:
      return {
        ...state,
        platformsLoading: payload,
      };

    case AD_PLATFORMS_SUCCESS:
      return {
        ...state,
        platforms: payload,
      };

    case AD_FABRICATION_YEARS_LOADING:
      return {
        ...state,
        fabricationYearsLoading: payload,
      };

    case AD_FABRICATION_YEARS_SUCCESS:
      return {
        ...state,
        fabricationYears: payload,
      };

    case AD_COUNTRIES_LOADING:
      return {
        ...state,
        countriesLoading: payload,
      };

    case AD_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: payload,
      };

    case AD_STATES_LOADING:
      return {
        ...state,
        statesLoading: payload,
      };

    case AD_STATES_SUCCESS:
      return {
        ...state,
        states: payload,
      };

    case AD_CITIES_LOADING:
      return {
        ...state,
        citiesLoading: payload,
      };

    case AD_CITIES_SUCCESS:
      return {
        ...state,
        cities: payload,
      };

    case AD_OPTINALS_LOADING:
      return {
        ...state,
        optionalsLoading: payload,
      };

    case AD_OPTINALS_SUCCESS:
      return {
        ...state,
        optionals: payload.data,
        has_optionals: payload.has_optionals,
      };

    case AD_EXTRAS_LOADING:
      return {
        ...state,
        extrasLoading: payload,
      };

    case AD_EXTRAS_SUCCESS:
      return {
        ...state,
        extras: payload,
      };

    case AD_PLANS_LOADING:
      return {
        ...state,
        plansLoading: payload,
      };

    case AD_PLANS_SUCCESS:
      return {
        ...state,
        plans: payload,
      };

    case AD_PAY_PLAN_LOADING:
      return {
        ...state,
        vehicleLoading: payload,
      };

    case AD_PAY_PLAN_FAILED:
      return {
        ...state,
        vehicleError: payload,
        vehicleLoading: false,
      };

    case AD_PAY_PLAN_SUCCESS:
      return {
        ...state,
        vehicleError: false,
        vehicleLoading: false,
      };

    case AD_VEHICLE_SAVE_LOADING:
      return {
        ...state,
        vehicleLoading: payload,
      };

    case AD_VEHICLE_SAVE_FAILED:
      return {
        ...state,
        vehicleError: payload,
        vehicleLoading: false,
      };

    case AD_VEHICLE_SAVE_SUCCESS:
      return {
        ...state,
        vehicleError: false,
        vehicleLoading: false,
      };

    case AD_POSTAL_CODE_LOADING:
      return {
        ...state,
        isValidPostalCodeLoading: payload,
      };

    case AD_POSTAL_CODE_CHECKED:
      return {
        ...state,
        isPostalCodeChecked: payload,
      };

    case AD_POSTAL_CODE_SUCCESS:
      return {
        ...state,
        isValidPostalCode: payload.success,
        postalCodeData: payload.data,
        isValidPostalCodeError: false,
      };

    case AD_POSTAL_CODE_FAILURE:
      return {
        ...state,
        isValidPostalCode: false,
        isValidPostalCodeError: payload,
        postalCodeData: {},
      };

    case AD_POSTAL_CODE_RESET:
      return {
        ...state,
        isValidPostalCode: false,
        isValidPostalCodeError: false,
        isValidPostalCodeLoading: false,
        postalCodeData: {},
      };

    case AD_INITIAL_VALUES_UPDATE:
      return {
        ...state,
        initialValues: {
          ...state.initialValues,
          ...payload,
        },
      };

    case AD_RESET_VALUES:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

export function fetchProductTypes(params) {
  return { type: AD_PRODUCT_TYPES_REQUEST, payload: params };
}

export function getBrandsByProductId(params) {
  return { type: AD_BRANDS_REQUEST, payload: params };
}

export function getModelsByBrandId(params) {
  return { type: AD_MODELS_REQUEST, payload: params };
}

export function getPlatformsByModelId(params) {
  return { type: AD_PLATFORMS_REQUEST, payload: params };
}

export function getFabricationYearsByModelId(params) {
  return { type: AD_FABRICATION_YEARS_REQUEST, payload: params };
}

export function fetchCountries() {
  return { type: AD_COUNTRIES_REQUEST };
}

export function getStatesByCountryId(params) {
  return { type: AD_STATES_REQUEST, payload: params };
}

export function getCitiesByStateId(params) {
  return { type: AD_CITIES_REQUEST, payload: params };
}

export function getOptionalsByProductId(params) {
  return { type: AD_OPTINALS_REQUEST, payload: params };
}

export function fetchExtras(params) {
  return { type: AD_EXTRAS_REQUEST, payload: params };
}

export function fetchPlans(params) {
  return { type: AD_PLANS_REQUEST, payload: params };
}

export function savePlan(params) {
  return { type: AD_PAY_PLAN_REQUEST, payload: params };
}

export function vehicleSaveLoading(params) {
  return { type: AD_VEHICLE_SAVE_LOADING, payload: params };
}

export function saveVehicle(params) {
  return { type: AD_VEHICLE_SAVE_REQUEST, payload: params };
}

export function updateInitialValues(params) {
  return { type: AD_INITIAL_VALUES_UPDATE, payload: params };
}

export function checkPostalCode(data) {
  return { type: AD_POSTAL_CODE_REQUEST, payload: data };
}

export function resetPostalCodeValidation() {
  return { type: AD_POSTAL_CODE_RESET };
}

export function resetValues() {
  return { type: AD_RESET_VALUES };
}

function* fetchProductTypesSaga({ payload }) {
  try {
    yield put({ type: AD_PRODUCT_TYPES_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.fetchProductTypes, payload);

    yield put({ type: AD_PRODUCT_TYPES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: AD_PRODUCT_TYPES_SUCCESS, payload: [] });
  } finally {
    yield put({ type: AD_PRODUCT_TYPES_LOADING, payload: false });
  }
}

function* getBrandsByProductIdSaga({ payload }) {
  try {
    yield put({ type: AD_BRANDS_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getBrandsByProductId, payload);

    yield put({ type: AD_BRANDS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: AD_BRANDS_SUCCESS, payload: [] });
  } finally {
    yield put({ type: AD_BRANDS_LOADING, payload: false });
  }
}

function* getModelsByBrandIdSaga({ payload }) {
  try {
    yield put({ type: AD_MODELS_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getModelsByBrandId, payload);

    yield put({ type: AD_MODELS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: AD_MODELS_SUCCESS, payload: [] });
  } finally {
    yield put({ type: AD_MODELS_LOADING, payload: false });
  }
}

function* getPlatformsByModelIdSaga({ payload }) {
  try {
    yield put({ type: AD_PLATFORMS_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getPlatformsByModelId, payload);

    yield put({ type: AD_PLATFORMS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: AD_PLATFORMS_SUCCESS, payload: [] });
  } finally {
    yield put({ type: AD_PLATFORMS_LOADING, payload: false });
  }
}

function* getFabricationYearsByModelIdSaga({ payload }) {
  try {
    yield put({ type: AD_FABRICATION_YEARS_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getFabricationYearsByModelId, payload);

    yield put({ type: AD_FABRICATION_YEARS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: AD_FABRICATION_YEARS_SUCCESS, payload: [] });
  } finally {
    yield put({ type: AD_FABRICATION_YEARS_LOADING, payload: false });
  }
}

function* fetchCountriesSaga() {
  try {
    yield put({ type: AD_COUNTRIES_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.fetchCountries);

    yield put({ type: AD_COUNTRIES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: AD_COUNTRIES_SUCCESS, payload: [] });
  } finally {
    yield put({ type: AD_COUNTRIES_LOADING, payload: false });
  }
}

function* getStatesByCountryIdSaga({ payload }) {
  try {
    yield put({ type: AD_STATES_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getStatesByCountryId, payload);

    yield put({ type: AD_STATES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: AD_STATES_SUCCESS, payload: [] });
  } finally {
    yield put({ type: AD_STATES_LOADING, payload: false });
  }
}

function* getCitiesByStateIdSaga({ payload }) {
  try {
    yield put({ type: AD_CITIES_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getCitiesByStateId, payload);

    yield put({ type: AD_CITIES_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: AD_CITIES_SUCCESS, payload: [] });
  } finally {
    yield put({ type: AD_CITIES_LOADING, payload: false });
  }
}

function* getOptionalsByProductIdSaga({ payload }) {
  try {
    yield put({ type: AD_OPTINALS_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.getOptionalsByProductId, payload);

    yield put({
      type: AD_OPTINALS_SUCCESS,
      payload: { data, has_optionals: Array.isArray(data) && data.length > 0 },
    });
  } catch (error) {
    yield put({
      type: AD_OPTINALS_SUCCESS,
      payload: { data: [], has_optionals: false },
    });
  } finally {
    yield put({ type: AD_OPTINALS_LOADING, payload: false });
  }
}

function* fetchExtrasSaga({ payload }) {
  try {
    yield put({ type: AD_EXTRAS_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.fetchExtras, payload);

    yield put({ type: AD_EXTRAS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: AD_EXTRAS_SUCCESS, payload: [] });
  } finally {
    yield put({ type: AD_EXTRAS_LOADING, payload: false });
  }
}

function* fetchPlansSaga({ payload }) {
  try {
    yield put({ type: AD_PLANS_LOADING, payload: true });

    const {
      data: { data },
    } = yield call(api.fetchPlans, payload);

    yield put({ type: AD_PLANS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: AD_PLANS_SUCCESS, payload: [] });
  } finally {
    yield put({ type: AD_PLANS_LOADING, payload: false });
  }
}
function* savePlanSaga({ payload: { values, resolve } }) {
  try {
    yield put({ type: AD_PAY_PLAN_LOADING, payload: true });

    const { data } = yield call(api.savePlan, values);

    if (resolve) {
      resolve(data);
    }

    yield put({ type: AD_PAY_PLAN_SUCCESS });
  } catch (error) {
    yield put({ type: AD_PAY_PLAN_FAILED, payload: true });
  }
}

function* saveVehicleSaga({ payload: { values, resolve } }) {
  try {
    yield put({ type: AD_VEHICLE_SAVE_LOADING, payload: true });

    const { id: user_id } = yield select((state) => state.auth.user);

    const {
      initialValues: {
        price,
        brand_id,
        city_id,
        description,
        extras,
        fabrication_year,
        mileage,
        model_id,
        motorhours,
        optionals,
        platform_id,
        product_id,
        trackhours,
        images,
        plan: { id: plan_id },
      },
    } = yield select((state) => state.ad);

    const vehicle_extra = extras?.map((extra_id) => ({ extra_id })) || [];
    const vehicle_optional = optionals?.map((optional_id) => ({ optional_id })) || [];

    const vehicle = {
      brand_id,
      city_id,
      description,
      fabrication_year,
      mileage: mileage ? removeAllNonNumeric(mileage) : '',
      model_id,
      motorhours: motorhours ? removeAllNonNumeric(motorhours) : '',
      platform_id,
      price: normalizePrice(price),
      product_id,
      trackhours: trackhours ? removeAllNonNumeric(trackhours) : '',
      user_id,
      vehicle_extra,
      vehicle_optional,
    };

    const plan = {
      ...values,
      plan_id,
    };

    const { data } = yield call(api.saveAd, { plan, vehicle });

    if (data?.success) {
      const vehicle_id = data?.data?.vehicle?.id;
      if (vehicle_id) {
        yield all(
          images.map((uri) => {
            return call(api.saveImage, { uri, vehicle_id });
          }),
        );
      }
    }

    yield delay(600);

    if (resolve) {
      resolve(data);
    }
    if (data?.success) {
      yield put({ type: AD_VEHICLE_SAVE_SUCCESS });
    } else {
      yield put({ type: AD_VEHICLE_SAVE_FAILED, payload: true });
    }
  } catch (error) {
    yield put({ type: AD_VEHICLE_SAVE_FAILED, payload: true });
  }
}

function* checkPostalCodeSaga({ payload: { values, resolve } }) {
  try {
    yield put({ type: AD_POSTAL_CODE_CHECKED, payload: false });
    yield put({ type: AD_POSTAL_CODE_LOADING, payload: true });

    const { data } = yield call(api.checkPostalCode, values);

    if (resolve) {
      resolve(data);
    }

    yield put({ type: AD_POSTAL_CODE_SUCCESS, payload: data });
    yield put({ type: AD_POSTAL_CODE_CHECKED, payload: true });
  } catch (error) {
    yield put({ type: AD_POSTAL_CODE_FAILURE, payload: true });
  } finally {
    yield put({ type: AD_POSTAL_CODE_LOADING, payload: false });
  }
}

function* watchAdFetchProductTypes() {
  yield takeLatest(AD_PRODUCT_TYPES_REQUEST, fetchProductTypesSaga);
}

function* watchAdGetBrandsByProductId() {
  yield takeLatest(AD_BRANDS_REQUEST, getBrandsByProductIdSaga);
}

function* watchAdGetModelsByBrandId() {
  yield takeLatest(AD_MODELS_REQUEST, getModelsByBrandIdSaga);
}

function* watchAdGetPlatformsByModelId() {
  yield takeLatest(AD_PLATFORMS_REQUEST, getPlatformsByModelIdSaga);
}

function* watchAdGetFabricationYearsByModelId() {
  yield takeLatest(AD_FABRICATION_YEARS_REQUEST, getFabricationYearsByModelIdSaga);
}

function* watchAdFetchCountries() {
  yield takeLatest(AD_COUNTRIES_REQUEST, fetchCountriesSaga);
}

function* watchAdGetStatesByCountryId() {
  yield takeLatest(AD_STATES_REQUEST, getStatesByCountryIdSaga);
}

function* watchAdGetCitiesByStateId() {
  yield takeLatest(AD_CITIES_REQUEST, getCitiesByStateIdSaga);
}

function* watchGetOptionalsByProductId() {
  yield takeLatest(AD_OPTINALS_REQUEST, getOptionalsByProductIdSaga);
}

function* watchFetchExtras() {
  yield takeLatest(AD_EXTRAS_REQUEST, fetchExtrasSaga);
}

function* watchFetchPlans() {
  yield takeLatest(AD_PLANS_REQUEST, fetchPlansSaga);
}

function* watchSavePlan() {
  yield takeLatest(AD_PAY_PLAN_REQUEST, savePlanSaga);
}

function* watchSaveVehicle() {
  yield takeLatest(AD_VEHICLE_SAVE_REQUEST, saveVehicleSaga);
}

function* watchCheckPostalCode() {
  yield takeLatest(AD_POSTAL_CODE_REQUEST, checkPostalCodeSaga);
}

export const adSagas = [
  fork(watchAdFetchCountries),
  fork(watchAdFetchProductTypes),
  fork(watchAdGetBrandsByProductId),
  fork(watchAdGetCitiesByStateId),
  fork(watchAdGetFabricationYearsByModelId),
  fork(watchAdGetModelsByBrandId),
  fork(watchAdGetPlatformsByModelId),
  fork(watchAdGetStatesByCountryId),
  fork(watchCheckPostalCode),
  fork(watchFetchExtras),
  fork(watchFetchPlans),
  fork(watchGetOptionalsByProductId),
  fork(watchSaveVehicle),
  fork(watchSavePlan),
];
