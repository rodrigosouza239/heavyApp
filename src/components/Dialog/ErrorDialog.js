import Button from '@components/Button';
import Dialog from '@components/Dialog';
import Typography from '@components/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import useTranslation from '@i18n/';

function ErrorDialog({ isVisible, onClose }) {
  const $t = useTranslation();
  const renderDialogDescription = () => {
    return (
      <>
        <Typography fontWeight="regular" align="center">
          {$t('errorSendingData')}
          {`\n`}
          {$t('tryAgain')}
        </Typography>
      </>
    );
  };

  const renderFooter = () => <Button onPress={onClose}>{$t('close')}</Button>;

  return (
    <Dialog
      description={renderDialogDescription}
      footer={renderFooter}
      icon="exclamation-circle"
      isVisible={isVisible}
      onClose={onClose}
      title="Oops!"
    />
  );
}

ErrorDialog.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorDialog;
