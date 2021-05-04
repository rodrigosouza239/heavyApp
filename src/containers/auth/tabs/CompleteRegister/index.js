import ErrorDialog from '@components/Dialog/ErrorDialog';
import SuccessDialog from '@components/Dialog/SuccessDialog';
import Loading from '@components/Loading';
// import { DELAY_TIME } from '@constants';
import { checkPostalCode, fetchCountries, resetPostalCodeValidation } from '@containers/auth/ducks';
import { getUser, updateUser } from '@containers/profile/ducks';
import useTranslation from '@i18n/';
import { removeAllNonNumeric } from '@utils';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from './components/Form';

function CompleteRegisterScreen({
  navigation,
  route: {
    params: { needed, onComplete },
  },
}) {
  const $t = useTranslation();
  const dispatch = useDispatch();
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);

  const {
    countries,
    isPostalCodeChecked,
    isValidPostalCode,
    isValidPostalCodeLoading,
    registerError,
    registerLoading,
    user,
  } = useSelector((state) => state.auth);
  const { userLoading, userUpdateLoading, userUpdatedSuccess, userUpdateError } = useSelector(
    (state) => state.profile,
  );

  const toggleModalSuccessVisible = () => {
    setModalSuccessVisible((visible) => !visible);
  };

  const toggleModalErrorVisible = () => setModalErrorVisible((v) => !v);

  useEffect(() => {
    if (userUpdatedSuccess) {
      toggleModalSuccessVisible();
    }

    if (userUpdateError || registerError) {
      toggleModalErrorVisible();
    }
  }, [userUpdatedSuccess, userUpdateError, registerError]);

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

    const newValues = { user_info: values, id: user?.id };

    const normalizedValues = cloneDeep(newValues);

    const {
      user_info: { birth_date, document_number, phone },
    } = newValues;

    normalizedValues.user_info.birth_date = moment(birth_date, 'DD/MM/YYYY', true).format(
      'YYYY-MM-DD',
    );

    normalizedValues.user_info.document_number = removeAllNonNumeric(document_number);
    normalizedValues.user_info.phone = phone;

    const data = await new Promise((resolve) => {
      dispatch(updateUser({ values: normalizedValues, resolve, update: true }));
    });

    if (data?.validation_errors?.email?.Unique) {
      formikActions.setFieldError('email', 'Email já utilizado');
    }

    if (data?.validation_errors?.user_info?.document_number?.Unique) {
      formikActions.setFieldError('document_number', 'Número de documento já utilizado');
    }

    if (data?.error?.message === 'invalid_postal_code') {
      formikActions.setFieldError('postal_code', 'CEP inválido');
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

  const isLoading = userLoading || userUpdateLoading || registerLoading || isValidPostalCodeLoading;
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
        needed={needed}
      />
      <SuccessDialog
        isVisible={modalSuccessVisible}
        onClose={() => {
          const params = {
            includes: ['vehicle', 'user_info'],
            where: [['id', '=', user?.id]],
            in: [['status', ['active', 'suspended']]],
          };
          dispatch(getUser(params));
          navigation.goBack();
          onComplete();
        }}
      />
      <ErrorDialog isVisible={modalErrorVisible} onClose={toggleModalErrorVisible} />
      <Loading text={loadingText} loading={isLoading} />
    </>
  );
}

export default CompleteRegisterScreen;
