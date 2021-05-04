import IconButton from '@components/Button/IconButton';
import PropTypes from 'prop-types';
import React from 'react';

function Checkbox({ checked, value, onPress }) {
  const handlePress = () => {
    if (onPress) {
      onPress(value);
    }
  };

  return <IconButton onPress={handlePress} name={checked ? 'check-square' : 'square'} />;
}

Checkbox.defaultProps = {
  checked: false,
  onPress: null,
  value: null,
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onPress: PropTypes.func,
  value: PropTypes.any,
};

export default Checkbox;
