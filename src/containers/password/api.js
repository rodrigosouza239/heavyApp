import { apiPrivate } from '@api/';
import pMinDelay from 'p-min-delay';
import { DELAY_TIME } from '@constants/';

export function updatePassword(params) {
  return pMinDelay(apiPrivate.post(`user/action/ChangePassword`, params), DELAY_TIME.default);
}

export default updatePassword;
