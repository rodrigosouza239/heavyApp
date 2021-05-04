import ErrorDialog from '@components/Dialog/ErrorDialog';
import Loading from '@components/Loading';
// import { DELAY_TIME } from '@constants';
import {
  checkPostalCode,
  fetchCountries,
  register,
  resetPostalCodeValidation,
} from '@containers/auth/ducks';
import useTranslation from '@i18n/';
import { removeAllNonNumeric } from '@utils';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from './components/Form';

function RegisterScreen() {
  const $t = useTranslation();
  const dispatch = useDispatch();
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const {
    countries,
    isPostalCodeChecked,
    isValidPostalCode,
    isValidPostalCodeLoading,
    registerError,
    registerLoading,
  } = useSelector((state) => state.auth);

  const toggleModalErrorVisible = () => setModalErrorVisible((v) => !v);

  useEffect(() => {
    if (registerError) {
      toggleModalErrorVisible();
    }
  }, [registerError]);

  useEffect(() => {
    dispatch(fetchCountries());

    return () => {
      resetPostalCodeValidation();
    };
  }, []);

  const handleSubmit = async (values, formikActions) => {
    if (!isValidPostalCode) {
      return false;
    }

    const normalizedValues = cloneDeep(values);

    const {
      user_info: { birth_date, document_number, phone },
    } = values;

    normalizedValues.user_info.birth_date = moment(birth_date, 'DD/MM/YYYY', true).format(
      'YYYY-MM-DD',
    );

    normalizedValues.user_info.document_number = removeAllNonNumeric(document_number);
    normalizedValues.user_info.phone = phone;

    const data = await new Promise((resolve) => {
      dispatch(register({ values: normalizedValues, formikActions, resolve }));
    });

    if (data?.validation_errors?.email?.Unique) {
      formikActions.setFieldError('email', $t('emailUsed'));
    }

    if (data?.validation_errors?.user_info?.document_number?.Unique) {
      formikActions.setFieldError('user_info.document_number', $t('documentUsed'));
    }

    if (data?.error?.message === 'invalid_postal_code') {
      formikActions.setFieldError('user_info.postal_code', $t('invalidZipCode'));
    }

    return true;
  };

  const checkPostalCodeDebounced = useRef(
    debounce((values) => {
      const { postal_code } = values;
      const POSTAL_CODE_LENGTH = 9;
      const POSTAL_CODE_LENGTH_2 = 5;
      if (
        postal_code &&
        (postal_code.length === POSTAL_CODE_LENGTH || postal_code.length === POSTAL_CODE_LENGTH_2)
      ) {
        dispatch(checkPostalCode(values));
      }
    }, 0),
  ).current;

  const handleChangePostalCode = (values) => {
    checkPostalCodeDebounced(values);
  };

  const isLoading = registerLoading || isValidPostalCodeLoading;
  const loadingText = isValidPostalCodeLoading ? $t('checkingZipCode') : $t('wait');

  return (
    <>
      <Form
        countries={countries}
        isPostalCodeChecked={isPostalCodeChecked}
        isValidPostalCode={isValidPostalCode}
        loading={registerLoading}
        onChangePostalCode={handleChangePostalCode}
        onSubmit={handleSubmit}
      />
      <ErrorDialog isVisible={modalErrorVisible} onClose={toggleModalErrorVisible} />
      <Loading text={loadingText} loading={isLoading} />
    </>
  );
}

export default RegisterScreen;
