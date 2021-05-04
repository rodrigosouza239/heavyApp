import Box from '@components/Box';
import { useTheme } from '@theme';
import PropTypes from 'prop-types';
import React from 'react';

function Container({ children, component, style, ...rest }) {
  const theme = useTheme();

  const {
    palette: {
      common: { white },
    },
    container,
  } = theme;

  const containerStyles = {
    backgroundColor: white,
  };

  const Component = component || Box;

  return (
    <Component style={[containerStyles, style]} p={container.spacingTimes} {...rest}>
      {children}
    </Component>
  );
}

Container.defaultProps = {
  component: null,
  style: null,
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Container;
