import Icon, { iconNames } from '@components/Icon';
import { useTheme } from '@theme/';
import colorManipulator from 'color';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function IconButton({ name, onPress, children, size }) {
  const {
    button: { activeOpacity },
    spacing,
    palette: { primary },
    icon: { size: iconSize },
  } = useTheme();

  const hitSlop = spacing(2);
  const newSize = size ?? iconSize;
  const computedSize = newSize + spacing();

  const handlePress = () => {
    if (onPress) {
      requestAnimationFrame(onPress);
    }
  };

  return (
    <TouchableHighlight
      hitSlop={{ top: hitSlop, right: hitSlop, bottom: hitSlop, left: hitSlop }}
      onPress={handlePress}
      underlayColor={colorManipulator(primary.main).alpha(0.08).rgb().toString()}
      activeOpacity={activeOpacity}
      style={[
        {
          width: computedSize,
          height: computedSize,
          borderRadius: computedSize / 2,
        },
        styles.root,
      ]}
    >
      {children || <Icon name={name} size={newSize} />}
    </TouchableHighlight>
  );
}

IconButton.defaultProps = {
  children: null,
  name: 'help',
  onPress: null,
  size: null,
};

IconButton.propTypes = {
  children: PropTypes.any,
  name: PropTypes.oneOf(iconNames),
  onPress: PropTypes.func,
  size: PropTypes.number,
};

export default IconButton;
