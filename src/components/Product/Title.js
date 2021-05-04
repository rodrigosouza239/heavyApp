import Box from '@components/Box';
import Typography from '@components/Typography';
import { wpd } from '@utils/';
import PropTypes from 'prop-types';
import React from 'react';

function Title({ prefix, suffix, size }) {
  const sizes = {
    small: 'body1',
    default: 'subtitle',
  };

  return (
    <Typography color="textSecondary" variant={sizes[size]} fontWeight="bold">
      <Box>
        <Typography
          style={{ width: wpd(50) }}
          numberOfLines={1}
          color="textSecondary"
          variant={sizes[size]}
          fontWeight="bold"
        >
          {prefix}
        </Typography>
      </Box>{' '}
      <Typography color="orange" variant={sizes[size]} fontWeight="bold">
        {suffix}
      </Typography>
    </Typography>
  );
}

Title.defaultProps = {
  size: 'default',
};

Title.propTypes = {
  prefix: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'default']),
};

export default Title;
