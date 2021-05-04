import { apiPrivate, apiPublic } from '@api/';
import { DELAY_TIME } from '@constants/';
import pMinDelay from 'p-min-delay';

export function getUser(params) {
  return pMinDelay(apiPrivate.post('/user/select', params), DELAY_TIME.default);
}

export function updateUserById(params) {
  return pMinDelay(apiPrivate.post(`user/save/${params.id}`, params), DELAY_TIME.default);
}

export function fetchCountries() {
  return apiPublic.get('country/select');
}

export function checkPostalCode(params) {
  return apiPublic.post('user_info/action/SearchPostalcode', params);
}

export default getUser;
