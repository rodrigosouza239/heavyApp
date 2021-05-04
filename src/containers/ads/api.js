import { apiPrivate, apiPublic } from '@api/';
import { DELAY_TIME } from '@constants/';
import pMinDelay from 'p-min-delay';

export function fetchVehicles(params) {
  return pMinDelay(apiPrivate.post('user/action/MyVehicles', params), DELAY_TIME.default);
}

export function getAdByVehicleId(vehicleId) {
  return apiPrivate.post(`user/action/MyVehiclesDetails`, { vehicle_id: vehicleId });
}

export function changeAdStatus(params) {
  return pMinDelay(apiPrivate.post(`vehicle/action/ChangeStatus`, params), DELAY_TIME.slow1x);
}

export function fetchProductTypes(params) {
  return apiPrivate.post('product/select', params);
}

export function getBrandsByProductId(params) {
  return apiPrivate.post('brand/select', params);
}

export function getModelsByBrandId(params) {
  return apiPrivate.post('model/select', params);
}

export function getPlatformsByModelId(params) {
  return apiPrivate.post('platform/select', params);
}

export function getFabricationYearsByModelId(params) {
  return apiPrivate.post('fabrication_year/select', params);
}

export function fetchCountries() {
  return apiPublic.get('country/select');
}

export function getStatesByCountryId(params) {
  return apiPrivate.post('state/select', params);
}

export function getCitiesByStateId(params) {
  return apiPrivate.post('city/select', params);
}

export function getOptionalsByProductId(params) {
  return apiPrivate.post(`optional/select`, params);
}

export function fetchExtras(params) {
  return apiPrivate.post(`extra/select`, params);
}

export function saveAd(params) {
  return apiPrivate.post(params?.id ? `vehicle/save/${params?.id}` : 'vehicle/save/0', params);
}

export function askReactivation(params) {
  return apiPrivate.post(`vehicle/action/AskReactivation`, params);
}

export function saveImage(params) {
  const { uri, vehicle_id } = params;
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  const data = new FormData();

  data.append('image', {
    uri,
    name: `${vehicle_id}-${new Date().getTime()}.${fileType}`,
    type: `image/${fileType}`,
  });

  data.append('vehicle_id', vehicle_id);
  data.append('position', 'top');

  return apiPrivate.post(`vehicle_image/save/0`, data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
}

export function deleteImageById(id) {
  return apiPrivate.delete(`vehicle_image/delete/${id}`);
}
