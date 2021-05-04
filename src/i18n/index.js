import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect, useSelector } from 'react-redux';
import en from './locales/en/en-US.json';
import pt from './locales/pt/pt-BR.json';

i18n.fallbacks = true;

i18n.translations = {
  en,
  pt,
};

export function getDeviceLanguage() {
  return Localization.locale;
}

export default function useTranslation() {
  const localization = useSelector((state) => state.localization);

  i18n.locale = localization.language ?? Localization.locale;

  return (key, params = {}) => {
    return i18n.t(key, params);
  };
}

export function withTranslation(HocComponent) {
  class WithTranslation extends PureComponent {
    t = (key, params = {}) => {
      const { localization } = this.props;

      i18n.locale = localization.language ?? Localization.locale;

      return i18n.t(key, params);
    };

    render() {
      const { localization, ...rest } = this.props;

      return <HocComponent {...rest} $t={this.t} />;
    }
  }

  WithTranslation.propTypes = {
    localization: PropTypes.shape({
      country: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
    }).isRequired,
  };

  const mapStateToProps = (state) => ({
    localization: state.localization,
  });

  return connect(mapStateToProps)(WithTranslation);
}
