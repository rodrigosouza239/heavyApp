import Box from '@components/Box';
import ErrorDialog from '@components/Dialog/ErrorDialog';
import SuccessDialog from '@components/Dialog/SuccessDialog';
import Loading from '@components/Loading';
// import { DELAY_TIME } from '@constants';
import {
  checkPostalCode,
  fetchCountries,
  getUser,
  resetPostalCodeValidation,
  updateUser,
} from '@containers/profile/ducks';
import { removeAllNonNumeric } from '@utils';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from './components/Form';
import LogoutButton from './components/LogoutButton';

function ProfileScreen({ navigation }) {
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const dispatch = useDispatch();
  const {
    countries,
    countriesLoading,
    isPostalCodeChecked,
    isValidPostalCode,
    isValidPostalCodeLoading,
    user,
    userError,
    userLoading,
    userUpdatedSuccess,
    userUpdateError,
    userUpdateLoading,
  } = useSelector((state) => state.profile);

  const id = useSelector((state) => {
    return state.auth.user ? state.auth.user.id : 0;
  });

  const params = {
    includes: ['vehicle', 'user_info'],
    where: [['id', '=', id]],
    in: [['status', ['active', 'suspended']]],
  };

  const toggleModalSuccessVisible = () => setModalSuccessVisible((visible) => !visible);

  const toggleModalErrorVisible = () => setModalErrorVisible((visible) => !visible);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Box mr={1}>
          <LogoutButton />
        </Box>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    function getRecord() {
      if (id) {
        dispatch(getUser(params));
      }
    }

    getRecord();
  }, [id]);

  useEffect(() => {
    if (userUpdatedSuccess) {
      toggleModalSuccessVisible();
    }

    if (userUpdateError || userError) {
      toggleModalErrorVisible();
    }
  }, [userUpdatedSuccess, userUpdateError, userError]);

  useEffect(() => {
    dispatch(fetchCountries());

    return () => {
      resetPostalCodeValidation();
    };
  }, []);

  useEffect(() => {
    const unmaskedPhone = removeAllNonNumeric(user?.user_info?.phone);

    if (unmaskedPhone?.[0] === '1') {
      user.user_info.phone_country = 'us';
    } else {
      user.user_info.phone_country = 'br';
    }
  }, [user]);

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
      if (!normalizedValues?.expo_token) {
        delete normalizedValues.expo_token;
      }
      dispatch(updateUser({ values: normalizedValues, resolve }));
    });

    if (data?.validation_errors?.email?.Unique) {
      formikActions.setFieldError('email', 'Email já utilizado');
    }

    if (data?.validation_errors?.user_info?.document_number?.Unique) {
      formikActions.setFieldError('user_info.document_number', 'Número de documento já utilizado');
    }

    if (data?.error?.message === 'invalid_postal_code') {
      formikActions.setFieldError('user_info.postal_code', 'CEP inválido');
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

  const isLoading =
    userLoading || userUpdateLoading || countriesLoading || isValidPostalCodeLoading;
  const loadingText = isValidPostalCodeLoading ? 'Verificando CEP...' : 'Aguarde...';

  return (
    <>
      <SuccessDialog isVisible={modalSuccessVisible} onClose={toggleModalSuccessVisible} />
      <ErrorDialog isVisible={modalErrorVisible} onClose={toggleModalErrorVisible} />
      <Loading text={loadingText} loading={isLoading} />
      <Form
        countries={countries}
        initialValues={user}
        isPostalCodeChecked={isPostalCodeChecked}
        isValidPostalCode={isValidPostalCode}
        loading={userUpdateLoading}
        onChangePostalCode={handleChangePostalCode}
        onSubmit={handleSubmit}
      />
    </>
  );
}

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileScreen;
