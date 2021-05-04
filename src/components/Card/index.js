import Container from '@components/Container';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import ShadowPaper from './ShadowPaper';

function Card({ children, containerProps, onPress, shadowPaperProps, style }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container py={0} {...containerProps}>
        <ShadowPaper {...shadowPaperProps} style={style}>
          {children}
        </ShadowPaper>
      </Container>
    </TouchableWithoutFeedback>
  );
}

Card.defaultProps = {
  children: null,
  containerProps: null,
  onPress: null,
  shadowPaperProps: null,
  style: null,
};

Card.propTypes = {
  children: PropTypes.node,
  containerProps: PropTypes.object,
  onPress: PropTypes.func,
  shadowPaperProps: PropTypes.object,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Card;
