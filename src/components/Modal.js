import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Animated,
  Dimensions,
  Modal as NativeModal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
});

function Modal({ isVisible, style, children, onClose, enableRequestClose, enablePressBackdrop }) {
  const {
    palette: {
      common: { white },
      background: { backdrop },
    },
    shape: { borderRadius },
    spacing,
  } = useTheme();

  const contentStyle = {
    backgroundColor: white,
    borderRadius,
    padding: spacing(),
    position: 'absolute',
    zIndex: 200,
  };

  const handleOnRequestClose = () => {
    if (enableRequestClose) {
      if (onClose) {
        onClose();
      }
    }
  };

  const handlePressBackDrop = () => {
    if (enablePressBackdrop) {
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <NativeModal
      onRequestClose={handleOnRequestClose}
      transparent
      animationType="fade"
      visible={isVisible}
    >
      <View style={styles.root}>
        <View style={[contentStyle, style]}>{children}</View>
        <TouchableWithoutFeedback onPress={handlePressBackDrop}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: backdrop,
              height: viewportHeight,
              width: viewportWidth,
              zIndex: 100,
            }}
          />
        </TouchableWithoutFeedback>
      </View>
    </NativeModal>
  );
}

Modal.defaultProps = {
  enablePressBackdrop: true,
  enableRequestClose: true,
  onClose: null,
  style: null,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  enablePressBackdrop: PropTypes.bool,
  enableRequestClose: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Modal;
