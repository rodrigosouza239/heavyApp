import { adSagas } from '@containers/ad/ducks';
import { adsSagas } from '@containers/ads/ducks';
import { authSagas } from '@containers/auth/ducks';
import { homeSagas } from '@containers/home/ducks';
import { profileSagas } from '@containers/profile/ducks';
import { searchSagas } from '@containers/search/ducks';
import { businessSagas } from '@containers/business/ducks';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    ...profileSagas,
    ...adSagas,
    ...authSagas,
    ...searchSagas,
    ...adsSagas,
    ...homeSagas,
    ...businessSagas,
  ]);
}
