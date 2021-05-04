import { apiPrivate } from '@api/';
import pMinDelay from 'p-min-delay';
import { DELAY_TIME } from '@constants/';

export function fetchProductTypes() {
  const params = {
    orderby: [['description', 'asc']],
  };

  return pMinDelay(apiPrivate.post('product/select', params), DELAY_TIME.slow1x);
}

export function sendContact(params) {
  return pMinDelay(apiPrivate.post('user/action/TalkToUs', params), DELAY_TIME.slow1x);
}

export default fetchProductTypes;
