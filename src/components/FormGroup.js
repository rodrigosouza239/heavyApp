import Box from '@components/Box';
import PropTypes from 'prop-types';
import React from 'react';

function FormGroup({ children, disableGutter, style, ...rest }) {
  return (
    <Box pb={disableGutter ? 0 : 2} style={style} {...rest}>
      {children}
    </Box>
  );
}

FormGroup.defaultProps = {
  disableGutter: false,
  style: null,
};

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  disableGutter: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default FormGroup;
