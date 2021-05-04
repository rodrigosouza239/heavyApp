import Box from '@components/Box';
import Typography from '@components/Typography';
import { useTheme } from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableHighlight } from 'react-native';

function ListItem({ children, onPress, value, style, size, selected, boxProps }) {
  const {
    button,
    palette: {
      action: { activeBackground },
    },
  } = useTheme();

  const handlePress = () => {
    if (onPress) {
      requestAnimationFrame(() => onPress(value));
    }
  };

  const sizeMap = {
    dense: button.dense.height,
    medium: button.medium.height,
  };

  const listItemStyles = {
    display: 'flex',
    height: size === 'auto' ? 'auto' : sizeMap[size],
    justifyContent: 'center',
    backgroundColor: selected ? activeBackground : 'transparent',
  };

  return (
    <TouchableHighlight
      activeOpacity={button.activeOpacity}
      onPress={handlePress}
      underlayColor={activeBackground}
    >
      <Box px={2} style={[listItemStyles, style]} accessible {...boxProps}>
        {typeof children === 'string' ? (
          <Typography color="textPrimary">{children}</Typography>
        ) : (
          children
        )}
      </Box>
    </TouchableHighlight>
  );
}

ListItem.defaultProps = {
  boxProps: null,
  children: null,
  onPress: null,
  selected: false,
  size: 'dense',
  style: null,
  value: null,
};

ListItem.propTypes = {
  boxProps: PropTypes.object,
  children: PropTypes.node,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['dense', 'medium', 'auto']),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  value: PropTypes.any,
};

export default ListItem;
