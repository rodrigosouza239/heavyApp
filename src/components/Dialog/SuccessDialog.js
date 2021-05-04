import Button from '@components/Button';
import Dialog from '@components/Dialog';
import Typography from '@components/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import useTranslation from '@i18n/';

function SuccessDialog({ isVisible, onClose }) {
  const $t = useTranslation();

  const renderDialogDescription = () => {
    return (
      <Typography fontWeight="regular" align="center">
        {$t('dataSentSuccessfully')}
      </Typography>
    );
  };

  const renderFooter = () => <Button onPress={onClose}>{$t('close')}</Button>;

  return (
    <Dialog
      description={renderDialogDescription}
      footer={renderFooter}
      icon="check"
      isVisible={isVisible}
      onClose={onClose}
      title={$t('ready')}
    />
  );
}

SuccessDialog.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessDialog;
