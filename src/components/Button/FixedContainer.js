import Container from '@components/Container';
import { useTheme } from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  fixed: {
    bottom: 0,
    position: 'absolute',
    width: viewportWidth,
  },
});

export function useFixedContainerHeight(spacings = 4) {
  const {
    spacing,
    button: {
      medium: { height },
    },
  } = useTheme();

  return spacing(spacings) + height;
}

function FixedContainer({ children }) {
  return (
    <Container
      style={[
        styles.fixed,
        {
          backgroundColor: 'transparent',
        },
      ]}
      pt={2}
      pb={2}
    >
      {children}
    </Container>
  );
}

FixedContainer.defaultProps = {
  children: null,
};

FixedContainer.propTypes = {
  children: PropTypes.node,
};

export default FixedContainer;
