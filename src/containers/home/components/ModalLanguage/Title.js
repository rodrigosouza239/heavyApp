import Typography from '@components/Typography';
import PropTypes from 'prop-types';
import React from 'react';

function Title({ children }) {
  return (
    <Typography variant="subtitle" gutterBottom color="textSecondary">
      {children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;
