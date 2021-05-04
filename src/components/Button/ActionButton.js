import Icon, { iconNames } from '@components/Icon';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  holder: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
});

function ActionButton({ name, onPress, style, size, color, disabled }) {
  const {
    button: { activeOpacity },
    palette: {
      primary,
      common: { black, white },
      error,
    },
    spacing,
  } = useTheme();

  const sizes = {
    small: {
      shape: {
        borderRadius: spacing(3),
        height: spacing(6),
        width: spacing(6),
      },
      icon: {
        fontSize: spacing(3),
      },
    },
    medium: {
      shape: {
        borderRadius: spacing(4),
        height: spacing(8),
        width: spacing(8),
      },
      icon: {
        fontSize: spacing(4),
      },
    },
    'xx-small': {
      shape: {
        borderRadius: spacing(2),
        height: spacing(4),
        width: spacing(4),
      },
      icon: {
        fontSize: spacing(2),
      },
    },
  };

  const computedSize = sizes[size];

  const colors = {
    primary: {
      shape: {
        backgroundColor: primary.main,
        icon: 'white',
      },
    },
    white: {
      shape: {
        backgroundColor: white,
        icon: 'primary',
      },
    },
    danger: {
      shape: {
        backgroundColor: error.main,
        icon: 'white',
      },
    },
  };

  const computedColor = colors[color];

  const actionButtonStyles = {
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.9,
    elevation: 6,
    ...computedSize.shape,
    ...computedColor.shape,
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={[actionButtonStyles, style]}
      disabled={disabled}
    >
      <View style={styles.holder}>
        <Icon
          color={computedColor.shape.icon}
          disabled={disabled}
          name={name}
          size={computedSize.icon.fontSize}
        />
      </View>
    </TouchableOpacity>
  );
}

ActionButton.defaultProps = {
  color: 'primary',
  disabled: false,
  name: 'phone',
  onPress: null,
  size: 'medium',
  style: null,
};

ActionButton.propTypes = {
  color: PropTypes.oneOf(['primary', 'white', 'danger']),
  disabled: PropTypes.bool,
  name: PropTypes.oneOf(iconNames),
  onPress: PropTypes.func,
  size: PropTypes.oneOf(['xx-small', 'small', 'medium']),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ActionButton;
