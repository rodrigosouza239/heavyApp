import ad from '@containers/ad/ducks';
import ads from '@containers/ads/ducks';
import auth, { LOGOUT_SUCCESS } from '@containers/auth/ducks';
import home from '@containers/home/ducks';
import profile from '@containers/profile/ducks';
import search from '@containers/search/ducks';
import localization from '@i18n/ducks';
import business from '@containers/business/ducks';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  ad,
  ads,
  auth,
  home,
  localization,
  profile,
  search,
  business,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
