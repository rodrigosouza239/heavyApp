import React from 'react';
import { useDispatch } from 'react-redux';
import Icon from '@components/Icon';
import { HeaderBackButton } from '@react-navigation/stack';
import useStackOptions from '@navigation/config/useHeaderOptions';
import { logout } from '@containers/auth/ducks';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';

function LogoutButton({ iconSize }) {
  const { icon } = useTheme();
  const stackOptions = useStackOptions();
  const dispatch = useDispatch();

  const computedIconSize = iconSize ?? icon.size;

  const handlePressLogout = () => {
    dispatch(logout());
  };

  const renderBackImage = () => (
    <Icon size={computedIconSize} color={stackOptions.headerTintColor} name="power-off" />
  );

  return (
    <HeaderBackButton
      backImage={renderBackImage}
      onPress={handlePressLogout}
      tintColor={stackOptions.headerTintColor}
      truncatedLabel=""
    />
  );
}

LogoutButton.defaultProps = {
  iconSize: undefined,
};

LogoutButton.propTypes = {
  iconSize: PropTypes.number,
};

export default LogoutButton;
