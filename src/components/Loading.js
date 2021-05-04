import Box from '@components/Box';
import Modal from '@components/Modal';
import Typography from '@components/Typography';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import ActivityIndicator from '@components/ActivityIndicator';
import useTranslation from '@i18n/';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Loading({ loading, text }) {
  const $t = useTranslation();
  const { spacing } = useTheme();
  const computedText = text || $t('wait');

  const size = spacing(18);

  return (
    <Modal
      style={[
        {
          width: size,
          height: size,
        },
        styles.root,
      ]}
      isVisible={loading}
    >
      <Box>
        <ActivityIndicator size="small" />
        <Box mt={2}>
          <Typography align="center">{computedText}</Typography>
        </Box>
      </Box>
    </Modal>
  );
}

Loading.defaultProps = {
  loading: false,
  text: null,
};

Loading.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
};

export default Loading;
