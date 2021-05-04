import ErrorDialog from '@components/Dialog/ErrorDialog';
import SuccessDialog from '@components/Dialog/SuccessDialog';
import Loading from '@components/Loading';
import useTranslation from '@i18n/';
import cloneDeep from 'lodash/cloneDeep';
import React, { useState } from 'react';
import * as api from './api';
import Form from './components/Form';

function PasswordScreen() {
  const $t = useTranslation();
  const [loading, setLoading] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const toggleModalSuccessVisible = () => setModalSuccessVisible((visible) => !visible);

  const toggleModalErrorVisible = () => setModalErrorVisible((visible) => !visible);

  const handleSubmit = async (values, formikActions) => {
    const normalizedValues = cloneDeep(values);
    normalizedValues.password_confirmation = values.password;
    normalizedValues.new_password_confirmation = values.new_password;

    try {
      setLoading(true);
      const { data } = await api.updatePassword(normalizedValues);

      if (data.error && data.error.message === 'invalid_password') {
        formikActions.setFieldError('password', $t('invalidPassword'));
      } else {
        toggleModalSuccessVisible();
      }
    } catch (error) {
      toggleModalErrorVisible();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessDialog isVisible={modalSuccessVisible} onClose={toggleModalSuccessVisible} />
      <ErrorDialog isVisible={modalErrorVisible} onClose={toggleModalErrorVisible} />
      <Loading loading={loading} />
      <Form onSubmit={handleSubmit} />
    </>
  );
}

export default PasswordScreen;
