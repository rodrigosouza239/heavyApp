import { apiPrivate, apiPublic } from '@api/';
import pMinDelay from 'p-min-delay';

export function fetchProductTypes() {
  const params = {
    orderby: [['description', 'asc']],
  };

  return apiPrivate.post('product/select', params);
}

export function getBrandsByProductId(productId) {
  const params = {
    orderby: [['description', 'asc']],
    where: [['product_id', '=', productId]],
  };

  return apiPrivate.post('brand/select', params);
}

export function getModelsByBrandId(brandId) {
  const params = {
    orderby: [['description', 'asc']],
    in: [['brand_id', brandId]],
  };

  return apiPrivate.post('model/select', params);
}

export function getYearsByModelId(modelId) {
  const params = {
    orderby: [['year', 'asc']],
    in: [['model_id', modelId]],
  };

  return apiPrivate.post('fabrication_year/select', params);
}

export function fetchStates(params) {
  // const params = {
  //   orderby: [['description', 'asc']],
  //   where: [['country_id', '>', 0]],
  // };

  return apiPrivate.post('state/select', params);
}

export function getCitiesByStateId(stateId) {
  const params = {
    orderby: [['description', 'asc']],
    where: [['state_id', '=', stateId]],
  };

  return apiPrivate.post(`city/select`, params);
}

export function getProductsByFilter(params) {
  return pMinDelay(apiPrivate.post(`vehicle/action/LandPageSearch`, params), params.delay || 0);
}

export function getAdByVehicleId(vehicleId) {
  return apiPrivate.post(`user/action/MyVehiclesDetails`, { vehicle_id: vehicleId });
}

export function sendChatEvent(params) {
  return apiPrivate.post(`user_chat_event/action/SendChatEvent`, params);
}

export function fetchCountries() {
  return apiPublic.get('country/select');
}
