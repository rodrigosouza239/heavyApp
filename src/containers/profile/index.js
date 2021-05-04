import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import useTranslation from '@i18n/';
import { logout } from '@containers/auth/ducks';
import { useDispatch } from 'react-redux';
import SelectBox from './components/SelectBox';

const ProfileIndexScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const $t = useTranslation();

  const boxes = [
    { locale: 'profileData', onPress: () => navigation.navigate('home-profile-data') },
    { locale: 'profilePassword', onPress: () => navigation.navigate('home-profile-password') },
    { locale: 'profileLogout', onPress: () => dispatch(logout()) },
  ];

  return (
    <View>
      {boxes.map(({ locale, onPress }) => (
        <SelectBox
          key={locale}
          title={$t(`${locale}.title`)}
          desc={$t(`${locale}.desc`)}
          onPress={onPress}
        />
      ))}
    </View>
  );
};

ProfileIndexScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProfileIndexScreen;
