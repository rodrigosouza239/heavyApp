import React from 'react';
import IconButton from '@components/Button/IconButton';
import Flag from '@components/Flag';
import PropTypes from 'prop-types';

function LanguageButton({ country, onPress }) {
  return (
    <IconButton onPress={onPress}>
      <Flag country={country} />
    </IconButton>
  );
}

LanguageButton.defaultProps = {
  country: 'br',
};

LanguageButton.propTypes = {
  country: PropTypes.oneOf(['us', 'br']),
  onPress: PropTypes.func.isRequired,
};

export default LanguageButton;
