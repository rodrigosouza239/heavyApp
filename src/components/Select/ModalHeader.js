import HeaderButton from '@components/HeaderButton';
import { getHeaderHeight } from '@constants/';
import { useHeaderHeight } from '@react-navigation/stack';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function ModalHeader({ onPress, screenName }) {
  const insets = useSafeAreaInsets();
  const height = useHeaderHeight();
  const {
    navigation: {
      header: { backgroundColor },
    },
  } = useTheme();

  const styles = {
    height: height || getHeaderHeight(),
    backgroundColor,
    justifyContent: 'center',
    paddingTop: insets.top,
  };

  return (
    <View style={styles}>
      <HeaderButton screenName={screenName} onPress={onPress} icon="times" />
    </View>
  );
}

ModalHeader.defaultProps = {
  screenName: '',
};

ModalHeader.propTypes = {
  onPress: PropTypes.func.isRequired,
  screenName: PropTypes.string,
};

export default ModalHeader;
