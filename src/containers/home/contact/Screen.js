import Button from '@components/Button';
import Dialog from '@components/Dialog';
import ErrorDialog from '@components/Dialog/ErrorDialog';
import Typography from '@components/Typography';
import { resetContact, sendContact } from '@containers/home/ducks';
import useTranslation from '@i18n/';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from './Form';

function Screen() {
  const $t = useTranslation();
  const [showDialogSuccess, setShowDialogSuccess] = useState(false);
  const [showDialogError, setShowDialogError] = useState(false);
  const { contactError, contactSuccess, contactLoading } = useSelector((state) => state.home);
  const profile = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();

  const handleSubmit = async (values, formikActions) => {
    try {
      await new Promise((resolve, reject) => {
        dispatch(sendContact({ values, resolve, reject }));
      });

      formikActions.resetForm();
    } catch (error) {
      // no feedback
    }
  };

  const user = {
    user_email: profile?.email ?? '',
    user_name: profile?.name ?? '',
    user_phone: profile?.user_info?.phone ?? '',
  };

  const toggleDialogSuccess = () => {
    setShowDialogSuccess((prevState) => !prevState);
  };

  const toggleDialogError = () => {
    setShowDialogError((prevState) => !prevState);
  };

  useEffect(() => {
    if (contactSuccess) {
      toggleDialogSuccess();
    }
  }, [contactSuccess]);

  useEffect(() => {
    if (contactError) {
      toggleDialogError();
    }
  }, [contactError]);

  useEffect(() => {
    return function resetScreen() {
      dispatch(resetContact());
    };
  }, []);

  const renderDialogDescription = () => {
    return (
      <Typography fontWeight="regular" align="center">
        {$t('contactSuccessDescription')}
      </Typography>
    );
  };

  const renderFooter = () => <Button onPress={toggleDialogSuccess}>{$t('close')}</Button>;

  return (
    <>
      <Form loading={contactLoading} user={user} onSubmit={handleSubmit} />
      <Dialog
        description={renderDialogDescription}
        footer={renderFooter}
        icon="check"
        isVisible={showDialogSuccess}
        onClose={toggleDialogSuccess}
        title={$t('contactSuccessTitle')}
      />
      <ErrorDialog isVisible={showDialogError} onClose={toggleDialogError} />
    </>
  );
}

export default Screen;
