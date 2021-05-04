import Box from '@components/Box';
import IconButton from '@components/Button/IconButton';
import Icon, { iconNames } from '@components/Icon';
import Modal from '@components/Modal';
import Typography from '@components/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  iconHolder: {
    display: 'flex',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  flex: {
    flex: 1,
  },
});

const { width: viewportWidth } = Dimensions.get('window');

function Dialog({
  description,
  enablePressBackdrop,
  enableRequestClose,
  footer,
  icon,
  isVisible,
  onClose,
  title,
  titleProps,
  containerProps,
}) {
  const holderStyles = {
    maxWidth: viewportWidth * 0.8,
    position: 'relative',
  };

  return (
    <Modal
      enablePressBackdrop={enablePressBackdrop}
      enableRequestClose={enableRequestClose}
      isVisible={isVisible}
      onClose={onClose}
    >
      <Box style={holderStyles} px={2} pt={4} pb={2} {...containerProps}>
        {title ? (
          <>
            <View style={styles.flex}>
              <Typography variant="h2" align="center" color="textSecondary" {...titleProps}>
                {title}
              </Typography>
            </View>
          </>
        ) : null}
        {onClose && (
          <View style={styles.closeIcon}>
            <IconButton onPress={onClose} name="times" size={18} />
          </View>
        )}
        {icon ? (
          <Box py={3} style={styles.iconHolder}>
            <Icon name={icon} size={60} />
          </Box>
        ) : null}
        {typeof description === 'function' ? <Box>{description()}</Box> : null}
      </Box>
      {typeof footer === 'function' ? <Box>{footer()}</Box> : null}
    </Modal>
  );
}

Dialog.defaultProps = {
  containerProps: null,
  description: null,
  enablePressBackdrop: true,
  enableRequestClose: true,
  footer: null,
  icon: null,
  onClose: null,
  title: null,
  titleProps: null,
};

Dialog.propTypes = {
  containerProps: PropTypes.object,
  description: PropTypes.func,
  enablePressBackdrop: PropTypes.bool,
  enableRequestClose: PropTypes.bool,
  footer: PropTypes.func,
  icon: PropTypes.oneOf(iconNames),
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string,
  titleProps: PropTypes.object,
};

export default Dialog;
