import Typography from '@components/Typography';
import PropTypes from 'prop-types';
import React from 'react';

function Price({ children, size, align, fontSize }) {
  const sizes = {
    default: 'body2',
    small: 'body2',
  };

  return (
    <Typography
      align={align}
      color="textSecondary"
      fontWeight="bold"
      ellipsizeMode="tail"
      numberOfLines={2}
      variant={sizes[size]}
      style={{ fontSize }}
    >
      {children}
    </Typography>
  );
}

Price.defaultProps = {
  align: 'right',
  children: '',
  size: 'default',
  fontSize: 16,
};

Price.propTypes = {
  align: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
  children: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default']),
  fontSize: PropTypes.number,
};

export default Price;
