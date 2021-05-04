import ErrorDialog from '@components/Dialog/ErrorDialog';
import SuccessDialog from '@components/Dialog/SuccessDialog';
import { DELAY_TIME, HTTP_STATUS } from '@constants/';
import useTranslation from '@i18n/';
import pMinDelay from 'p-min-delay';
import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import * as api from '../api';
import Form from './components/Form';

function ForgotScreen() {
  const $t = useTranslation();
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const toggleModalSuccessVisible = () => setModalSuccessVisible((visible) => !visible);

  const toggleModalErrorVisible = () => setModalErrorVisible((visible) => !visible);

  const handleFormSubmit = async ({ email }, formikActions) => {
    try {
      Keyboard.dismiss();
      const { data } = await pMinDelay(api.forgotPassword(email), DELAY_TIME.slow1x);

      if (data && data.code === 'request_password_sended') {
        formikActions.resetForm();
        toggleModalSuccessVisible();
      }
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.code === 'emailnotfound' &&
        error.response.status === HTTP_STATUS.NOT_FOUND
      ) {
        formikActions.setFieldError('email', $t('emailNotFound'));
      } else {
        toggleModalErrorVisible();
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} />
      <SuccessDialog isVisible={modalSuccessVisible} onClose={toggleModalSuccessVisible} />
      <ErrorDialog isVisible={modalErrorVisible} onClose={toggleModalErrorVisible} />
    </>
  );
}

export default ForgotScreen;
