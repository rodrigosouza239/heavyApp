import Box from '@components/Box';
import Button from '@components/Button';
import Dialog from '@components/Dialog';
import useTranslation from '@i18n/';
import { setCountry, setLanguage } from '@i18n/ducks';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Item from './Item';
import Title from './Title';

const { width: viewportWidth } = Dimensions.get('window');

function ModalLanguage({ isVisible, onClose }) {
  const $t = useTranslation();
  const localization = useSelector((state) => state.localization);
  const dispatch = useDispatch();

  const isLanguagePT = `${localization.language}`.toLowerCase().includes('pt');
  const isCountryBR = `${localization.country}`.toLowerCase().includes('br');

  const data = [
    {
      id: 'language',
      category: $t('language'),
      items: [
        {
          key: 1,
          checked: isLanguagePT,
          text: $t('brazilianPortuguese'),
          language: 'pt-BR',
        },
        {
          key: 2,
          checked: !isLanguagePT,
          text: $t('english'),
          language: 'en-US',
        },
      ],
    },
    {
      id: 'country',
      category: $t('previewAds'),
      items: [
        {
          key: 3,
          checked: isCountryBR,
          text: $t('brazil'),
          country: 'BR',
        },
        {
          key: 4,
          checked: !isCountryBR,
          text: $t('unitedStates'),
          country: 'US',
        },
      ],
    },
  ];

  const handlePressItem = ({ id, country, language }) => {
    if (id === 'country') {
      return dispatch(setCountry(country));
    }
    return dispatch(setLanguage(language));
  };

  return (
    <Dialog
      containerProps={{ style: { width: viewportWidth * 0.8 } }}
      isVisible={isVisible}
      onClose={onClose}
      description={() =>
        data.map(({ category, id, items }, index) => (
          <View key={id}>
            <Box mt={index !== 0 ? 2 : 0}>
              <Title>{category}</Title>
            </Box>
            {items.map((item) => (
              <Item key={item.key} onPress={handlePressItem} data={{ ...item, id }} />
            ))}
          </View>
        ))
      }
      footer={() => <Button onPress={onClose}>{$t('close')}</Button>}
    />
  );
}

ModalLanguage.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalLanguage;
