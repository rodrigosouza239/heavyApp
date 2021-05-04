import { iconNames } from '@components/Icon';
import useAuthenticatedHeaderOptions from '@navigation/config/useHeaderOptions';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import IconButton from './Button/IconButton';

function HeaderButton({ onPress, icon, screenName }) {
  const { headerTintColor } = useAuthenticatedHeaderOptions();
  const { spacing } = useTheme();

  const handlePress = () => {
    return onPress && window.requestAnimationFrame(onPress);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          marginHorizontal: spacing(),
          justifyContent: 'center',
        }}
      >
        <IconButton onPress={handlePress} name={icon} color={headerTintColor} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 24 + spacing(),
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{screenName}</Text>
      </View>
    </View>
  );
}

HeaderButton.defaultProps = {
  screenName: '',
};

HeaderButton.propTypes = {
  icon: PropTypes.oneOf(iconNames).isRequired,
  onPress: PropTypes.func.isRequired,
  screenName: PropTypes.string,
};

export default HeaderButton;
