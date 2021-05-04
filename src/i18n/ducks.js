import { getDeviceLanguage } from './';

export const I18N_SET_COUNTRY = 'app/ad/SET_COUNTRY';
export const I18N_SET_LANGUAGE = 'app/ad/SET_LANGUAGE';

const INITIAL_STATE = {
  country: 'BR',
  language: getDeviceLanguage(),
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case I18N_SET_COUNTRY:
      return {
        ...state,
        country: payload,
      };

    case I18N_SET_LANGUAGE:
      return {
        ...state,
        language: payload,
      };

    default:
      return state;
  }
};

export function setCountry(country) {
  return { type: I18N_SET_COUNTRY, payload: country };
}

export function setLanguage(language) {
  return { type: I18N_SET_LANGUAGE, payload: language };
}
