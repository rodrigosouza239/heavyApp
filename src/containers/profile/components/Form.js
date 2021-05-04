import { isValidCEP, isValidCNPJ, isValidCPF } from '@brazilian-utils/brazilian-utils';
import Button from '@components/Button';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import Box from '@components/Box';
import Typography from '@components/Typography';
import CheckBox from '@components/CheckBox';
import ErrorMessage from '@components/ErrorMessage';
import FormErrorMessage from '@components/FormErrorMessage';
import FormGroup from '@components/FormGroup';
import Icon from '@components/Icon';
import { SelectCollapsible, SelectFlagCollapsible, SelectModal } from '@components/Select';
import TextInput from '@components/TextInput';
import Flag from '@components/Flag';
import useTranslation from '@i18n/';
import { useHeaderHeight } from '@react-navigation/stack';
import { useTheme } from '@theme';
import { Formik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import * as Yup from 'yup';

function Form({
  countries,
  initialValues,
  isPostalCodeChecked,
  isValidPostalCode,
  loading,
  onChangePostalCode,
  onSubmit,
}) {
  const $t = useTranslation();
  const headerHeight = useHeaderHeight();

  const { spacing } = useTheme();

  const extraHeight = headerHeight + spacing();

  const requiredMessage = $t('requiredField');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(requiredMessage),
    email: Yup.string().email($t('invalidEmail')).required(requiredMessage),
    user_info: Yup.object().shape({
      birth_date: Yup.string()
        .required(requiredMessage)
        .test('valid-date', $t('invalidDate'), (value) => {
          return moment(value, 'DD/MM/YYYY').isValid();
        }),
      document_number: Yup.string().when('document_type', (document_type) => {
        if (document_type === 'CPF')
          return Yup.string()
            .required(requiredMessage)
            .test('valid-cpf', $t('invalidCPF'), (value) => {
              return isValidCPF(value);
            });
        if (document_type === 'CNPJ')
          return Yup.string()
            .required(requiredMessage)
            .test('valid-cnpj', $t('invalidCNPJ'), (value) => {
              return isValidCNPJ(value);
            });
        if (document_type === 'SSN')
          return Yup.string()
            .required(requiredMessage)
            .test('valid-ssn', $t('invalidSSN'), (value) => {
              const regexp = /^(?!000|666)[0-8][0-9]{2}(?!00)[0-9]{2}(?!0000)[0-9]{4}$/;
              return regexp.test(value);
            });
        if (document_type === 'EIN')
          return Yup.string()
            .required(requiredMessage)
            .test('valid-ein', $t('invalidEIN'), (value) => {
              const regexp = /^\d{9}$/;
              return regexp.test(value);
            });
        return Yup.string().required(requiredMessage);
      }),
      // document_number: Yup.string().when('document_type', {
      //   is: 'CPF',
      //   then: Yup.string()
      //     .required(requiredMessage)
      //     .test('valid-cpf', $t('invalidCPF'), (value) => {
      //       return isValidCPF(value);
      //     }),
      //   otherwise: Yup.string()
      //     .required(requiredMessage)
      //     .test('valid-cnpj', $t('invalidCNPJ'), (value) => {
      //       return isValidCNPJ(value);
      //     }),
      // }),
      document_type: Yup.string().required(requiredMessage),
      genre: Yup.string().required(requiredMessage),
      phone: Yup.string().required(requiredMessage),
      postal_code: Yup.string().when('country_id', (country_id) => {
        if (String(country_id) === '1')
          return Yup.string()
            .required(requiredMessage)
            .test('valid-postal-code', $t('invalidZipCode'), (value) => {
              return isValidCEP(value);
            });
        return Yup.string()
          .required(requiredMessage)
          .test('valid-zip-code', $t('invalidZipCode'), (value) => {
            const regexp = /^\d{5}$/;
            return regexp.test(value);
          });
      }),
      country_id: Yup.string().required(requiredMessage),
      // postal_code: Yup.string()
      //   .required(requiredMessage)
      //   .test('valid-postal-code', $t('invalidZipCode'), (value) => {
      //     return isValidCEP(value);
      //   }),
    }),
  });

  const refs = {
    birthDateRef: useRef(),
    cellPhoneRef: useRef(),
    cellPhoneCountryRef: useRef(),
    documentNumberRef: useRef(),
    documentTypeRef: useRef(),
    emailRef: useRef(),
    genreRef: useRef(),
    nameRef: useRef(),
    postalCodeRef: useRef(),
  };

  const focusToNextField = (nextField) => {
    const field = refs[nextField].current;

    try {
      field.focus();
    } catch {
      field.root.getElement().focus(); // workaround to focus masked inputs
    }
  };

  const fixedContainerHeight = useFixedContainerHeight();

  const postalCodeLength = 9;
  const postalCodeLengthUsa = 5;

  const getErrorMessage = (errors, name, subName) => {
    if (subName) {
      if (errors?.[name]?.[subName]) {
        return <ErrorMessage>{errors?.[name]?.[subName]}</ErrorMessage>;
      }
    } else if (errors?.[name]) {
      return <ErrorMessage>{errors?.[name]}</ErrorMessage>;
    }
    return null;
  };

  useEffect(() => {
    if (initialValues && !initialValues?.phone_country) {
      initialValues.phone_country = initialValues?.phone?.includes('+55') ? 'br' : 'us';
    }
  }, [initialValues]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, values, setFieldValue }) => (
        <>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always" extraHeight={extraHeight}>
            <Container style={{ paddingBottom: fixedContainerHeight }}>
              <FormGroup>
                <TextInput
                  autoCompleteType="name"
                  icon="user"
                  label={$t('fullName')}
                  maxLength={255}
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                  onSubmitEditing={() => focusToNextField('documentTypeRef')}
                  ref={refs.nameRef}
                  returnKeyType="next"
                  value={values.name}
                />
                <FormErrorMessage name="name" />
                {getErrorMessage(errors, 'name')}
              </FormGroup>
              {String(values.user_info.country_id) === '1' ? (
                <FormGroup>
                  <SelectCollapsible
                    icon="document"
                    label={$t('whichDocument')}
                    onChange={(value) => setFieldValue('user_info.document_type', value)}
                    ref={refs.documentTypeRef}
                    value={values?.user_info?.document_type?.toUpperCase()}
                    options={[
                      { label: 'CNPJ', value: 'CNPJ' },
                      { label: 'CPF', value: 'CPF' },
                    ]}
                  />
                  {getErrorMessage(errors, 'user_info', 'document_type')}
                </FormGroup>
              ) : (
                <FormGroup>
                  <SelectCollapsible
                    icon="document"
                    label={$t('whichDocument')}
                    onChange={(value) => setFieldValue('user_info.document_type', value)}
                    ref={refs.documentTypeRef}
                    value={values?.user_info?.document_type?.toUpperCase()}
                    options={[
                      { label: 'SSN', value: 'SSN' },
                      { label: 'EIN', value: 'EIN' },
                    ]}
                  />
                  {getErrorMessage(errors, 'user_info', 'document_type')}
                </FormGroup>
              )}
              <FormGroup>
                <TextInput
                  autoCompleteType="off"
                  autoCorrect={false}
                  icon="document"
                  label={$t('documentNumber')}
                  onBlur={handleBlur('user_info.document_number')}
                  onChangeText={handleChange('user_info.document_number')}
                  onSubmitEditing={() => focusToNextField('birthDateRef')}
                  ref={refs.documentNumberRef}
                  returnKeyType="next"
                  value={`${values.user_info?.document_number || ''}`}
                  render={(props) => {
                    if (String(values.user_info?.country_id) === '1')
                      return (
                        <TextInputMask
                          type={
                            values.user_info?.document_type?.toUpperCase() === 'CPF'
                              ? 'cpf'
                              : 'cnpj'
                          }
                          {...props}
                        />
                      );
                    return (
                      <TextInputMask
                        type="custom"
                        options={{
                          mask:
                            values.user_info?.document_type === 'SSN' ? '999999999' : '999999999',
                        }}
                        {...props}
                      />
                    );
                  }}
                />
                {getErrorMessage(errors, 'user_info', 'document_number')}
              </FormGroup>
              <FormGroup>
                <TextInput
                  autoCompleteType="off"
                  autoCorrect={false}
                  icon="calendar"
                  label={$t('dateBirth')}
                  onBlur={handleBlur('user_info.birth_date')}
                  onChangeText={handleChange('user_info.birth_date')}
                  onSubmitEditing={() => focusToNextField('genreRef')}
                  placeholder="dd/mm/yyyy"
                  ref={refs.birthDateRef}
                  returnKeyType="next"
                  value={values.user_info.birth_date}
                  render={(props) => (
                    <TextInputMask
                      type="datetime"
                      options={{
                        format: 'DD/MM/YYYY',
                      }}
                      {...props}
                    />
                  )}
                />
                {getErrorMessage(errors, 'user_info', 'birth_date')}
              </FormGroup>
              <FormGroup>
                <SelectCollapsible
                  icon="document"
                  label={$t('gender')}
                  onChange={(value) => setFieldValue('user_info.genre', value)}
                  ref={refs.genreRef}
                  value={values.user_info.genre}
                  options={[
                    { label: $t('male'), value: 'M' },
                    { label: $t('female'), value: 'F' },
                  ]}
                />
                {getErrorMessage(errors, 'user_info', 'genre')}
              </FormGroup>
              <FormGroup>
                <TextInput
                  autoCapitalize="none"
                  autoCompleteType="email"
                  autoCorrect={false}
                  icon="envelope-open-text"
                  keyboardType="email-address"
                  label={$t('email')}
                  maxLength={255}
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  onSubmitEditing={() => focusToNextField('cellPhoneRef')}
                  ref={refs.emailRef}
                  returnKeyType="next"
                  value={values.email}
                />
                {getErrorMessage(errors, 'email')}
              </FormGroup>
              <FormGroup style={{ flexDirection: 'row' }}>
                <Box style={{ width: '15%' }}>
                  <SelectFlagCollapsible
                    onChange={(value) => {
                      setFieldValue('user_info.phone', '');
                      setFieldValue('user_info.phone_country', value);
                    }}
                    ref={refs.cellPhoneCountryRef}
                    value={values.user_info.phone_country}
                    options={[
                      { label: <Flag country="br" />, value: 'br' },
                      { label: <Flag country="us" />, value: 'us' },
                    ]}
                  />
                </Box>
                <Box style={{ width: '85%' }}>
                  <TextInput
                    autoCompleteType="tel"
                    autoCorrect={false}
                    icon="mobile"
                    keyboardType="phone-pad"
                    label={$t('cellPhone')}
                    onBlur={handleBlur('user_info.phone')}
                    onChangeText={handleChange('user_info.phone')}
                    onSubmitEditing={() => focusToNextField('postalCodeRef')}
                    ref={refs.cellPhoneRef}
                    returnKeyType="next"
                    value={values.user_info.phone}
                    render={(props) => {
                      if (String(values?.user_info?.phone_country) === 'br')
                        return (
                          <TextInputMask
                            type="custom"
                            options={{
                              mask: '+55 (99) 99999-9999',
                            }}
                            {...props}
                          />
                        );
                      return (
                        <TextInputMask
                          type="custom"
                          options={{
                            mask: '+1 (999) 999-9999',
                          }}
                          {...props}
                        />
                      );
                    }}
                  />
                  {getErrorMessage(errors, 'user_info', 'phone')}
                </Box>
              </FormGroup>

              <FormGroup>
                <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    value={values?.user_info?.phone_is_whatsapp}
                    onPress={() =>
                      setFieldValue(
                        'user_info.phone_is_whatsapp',
                        !values?.user_info?.phone_is_whatsapp,
                      )
                    }
                    checked={values?.user_info?.phone_is_whatsapp}
                  />
                  <Typography>{$t('isWhats')}</Typography>
                </Box>
              </FormGroup>

              <FormGroup>
                <SelectModal
                  endAdornment={<Icon name="plus" />}
                  label={$t('country')}
                  labelKey="description"
                  options={countries}
                  value={values.user_info?.country_id}
                  valueKey="id"
                  onChange={(value) => {
                    setFieldValue('user_info.country_id', value);
                  }}
                />
                {getErrorMessage(errors, 'user_info', 'country_id')}
              </FormGroup>
              <FormGroup disableGutter>
                <TextInput
                  autoCompleteType="postal-code"
                  autoCorrect={false}
                  disabled={!values.user_info.country_id}
                  icon="map-marker"
                  keyboardType="numeric"
                  label={String(values.user_info.country_id) === '1' ? $t('zipCode') : 'ZIP'}
                  onBlur={() => {
                    handleBlur('user_info.postal_code');
                    onChangePostalCode({
                      postal_code: values.user_info.postal_code,
                      country_id: values.user_info.country_id,
                    });
                  }}
                  ref={refs.postalCodeRef}
                  value={values.user_info.postal_code}
                  onChangeText={(value) => {
                    setFieldValue('user_info.postal_code', value);
                  }}
                  render={(props) => {
                    if (String(values.user_info?.country_id) === '1')
                      return <TextInputMask type="zip-code" {...props} />;
                    return (
                      <TextInputMask
                        type="custom"
                        options={{
                          mask: '99999',
                        }}
                        {...props}
                      />
                    );
                  }}
                />
                {values?.user_info?.postal_code &&
                (values.user_info.postal_code.length === postalCodeLength ||
                  values.user_info.postal_code.length === postalCodeLengthUsa) &&
                isPostalCodeChecked &&
                !isValidPostalCode ? (
                  <ErrorMessage>{$t('invalidZipCodeLabel')}</ErrorMessage>
                ) : (
                  getErrorMessage(errors, 'user_info', 'postal_code')
                )}
              </FormGroup>
            </Container>
          </KeyboardAwareScrollView>
          <FixedContainer>
            <Button loading={loading} onPress={handleSubmit}>
              {$t('save')}
            </Button>
          </FixedContainer>
        </>
      )}
    </Formik>
  );
}

Form.propTypes = {
  countries: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
  isPostalCodeChecked: PropTypes.bool.isRequired,
  isValidPostalCode: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onChangePostalCode: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
