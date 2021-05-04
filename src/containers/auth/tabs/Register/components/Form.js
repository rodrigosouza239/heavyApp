import { isValidCEP, isValidCNPJ, isValidCPF } from '@brazilian-utils/brazilian-utils';
import Button from '@components/Button';
import Container from '@components/Container';
import ErrorMessage from '@components/ErrorMessage';
import FormErrorMessage from '@components/FormErrorMessage';
import FormGroup from '@components/FormGroup';
import Icon from '@components/Icon';
import { SelectCollapsible, SelectModal, SelectFlagCollapsible } from '@components/Select';
import { logoSizes } from '@components/Svg/Logo';
import Flag from '@components/Flag';
import TextInput from '@components/TextInput';
import PasswordTextInput from '@components/TextInput/Password';
import useTranslation from '@i18n/';
import { useTheme } from '@theme/';
import { Formik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import CheckBox from '@components/CheckBox';
import Box from '@components/Box';
import Typography from '@components/Typography';
import { useNavigation } from '@react-navigation/native';

function Form({
  countries,
  isPostalCodeChecked,
  isValidPostalCode,
  loading,
  onChangePostalCode,
  onSubmit,
}) {
  const $t = useTranslation();
  const requiredMessage = $t('requiredField');
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(requiredMessage),
    email: Yup.string().email($t('invalidEmail')).required(requiredMessage),
    password: Yup.string().required(requiredMessage),
    password_confirmation: Yup.string()
      .required(requiredMessage)
      .oneOf([Yup.ref('password'), null], $t('passwordsNotMatch')),
    user_info: Yup.object().shape({
      birth_date: Yup.string()
        .required(requiredMessage)
        .test('valid-date', $t('invalidDate'), (value) => {
          return moment(value, 'DD/MM/YYYY', true).isValid();
        }),
      country_id: Yup.string().required(requiredMessage),
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
      // postal_code: Yup.string()
      //   .required(requiredMessage)
      //   .test('valid-postal-code', $t('invalidZipCode'), (value) => {
      //     return isValidCEP(value);
      //   }),
    }),
    privacy: Yup.bool().oneOf([true], $t('mustAcceptTerm')),
    useTerm: Yup.bool().oneOf([true], $t('mustAcceptTerm')),
  });

  const refs = {
    birthDateRef: useRef(),
    cellPhoneRef: useRef(),
    confirmPasswordRef: useRef(),
    documentNumberRef: useRef(),
    documentTypeRef: useRef(),
    emailRef: useRef(),
    genreRef: useRef(),
    nameRef: useRef(),
    passwordRef: useRef(),
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

  const postalCodeLength = 9;
  const postalCodeLengthUsa = 5;

  const insets = useSafeAreaInsets();
  const {
    container: { spacingTimes },
    spacing,
    tabBar,
  } = useTheme();

  const extraHeight =
    insets.top + logoSizes.small.height + spacing(3 + spacingTimes * 3) + tabBar.height;

  return (
    <Formik
      initialValues={{
        email: '',
        name: '',
        password_confirmation: '',
        password: '',
        user_info: {
          birth_date: '',
          country_id: '1',
          document_number: '',
          document_type: 'CPF',
          genre: 'M',
          phone: '',
          postal_code: '',
          phone_is_whatsapp: false,
          phone_country: 'br',
        },
        privacy: false,
        useTerm: false,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <>
          <KeyboardAwareScrollView
            extraHeight={extraHeight}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
            <Container>
              <FormGroup>
                <TextInput
                  autoCompleteType="name"
                  icon="user"
                  label={$t('fullName')}
                  maxLength={255}
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                  onSubmitEditing={() => focusToNextField('emailRef')}
                  ref={refs.nameRef}
                  returnKeyType="next"
                  value={values.name}
                />
                <FormErrorMessage name="name" />
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
                  ref={refs.emailRef}
                  returnKeyType="done"
                  value={values.email}
                />
                <FormErrorMessage name="email" />
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
                <FormErrorMessage name="user_info.genre" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  autoCompleteType="off"
                  autoCorrect={false}
                  icon="calendar"
                  label={$t('dateBirth')}
                  onBlur={handleBlur('user_info.birth_date')}
                  onChangeText={handleChange('user_info.birth_date')}
                  placeholder="dd/mm/yyyy"
                  ref={refs.birthDateRef}
                  returnKeyType="done"
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
                <FormErrorMessage name="user_info.birth_date" />
              </FormGroup>
              <FormGroup>
                <SelectModal
                  endAdornment={<Icon name="plus" />}
                  label={$t('country')}
                  labelKey="description"
                  options={countries}
                  value={values.user_info.country_id}
                  valueKey="id"
                  onChange={(value) => {
                    setFieldValue('user_info.country_id', value);
                  }}
                  icon="globe-americas"
                />
                <FormErrorMessage name="user_info.country_id" />
              </FormGroup>
              {String(values.user_info.country_id) === '1' ? (
                <FormGroup>
                  <SelectCollapsible
                    icon="document"
                    label={$t('whichDocument')}
                    onChange={(value) => setFieldValue('user_info.document_type', value)}
                    ref={refs.documentTypeRef}
                    value={values.user_info.document_type}
                    options={[
                      { label: 'CNPJ', value: 'CNPJ' },
                      { label: 'CPF', value: 'CPF' },
                    ]}
                  />
                </FormGroup>
              ) : (
                <FormGroup>
                  <SelectCollapsible
                    icon="document"
                    label={$t('whichDocument')}
                    onChange={(value) => setFieldValue('user_info.document_type', value)}
                    ref={refs.documentTypeRef}
                    value={values.user_info.document_type}
                    options={[
                      { label: 'SSN', value: 'SSN' },
                      { label: 'EIN', value: 'EIN' },
                    ]}
                  />
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
                  onSubmitEditing={() => focusToNextField('cellPhoneRef')}
                  ref={refs.documentNumberRef}
                  returnKeyType="done"
                  value={values.user_info.document_number}
                  keyboardType="numeric"
                  render={(props) => {
                    if (String(values.user_info.country_id) === '1')
                      return (
                        <TextInputMask
                          type={values.user_info.document_type === 'CPF' ? 'cpf' : 'cnpj'}
                          {...props}
                        />
                      );
                    return (
                      <TextInputMask
                        type="custom"
                        options={{
                          mask:
                            values.user_info.document_type === 'SSN' ? '999999999' : '999999999',
                        }}
                        {...props}
                      />
                    );
                  }}
                />
                <FormErrorMessage name="user_info.document_number" />
              </FormGroup>
              <FormGroup style={{ flexDirection: 'row' }}>
                <Box style={{ width: '15%' }}>
                  <SelectFlagCollapsible
                    onChange={(value) => setFieldValue('user_info.phone_country', value)}
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
                  <FormErrorMessage name="user_info.phone" />
                </Box>
              </FormGroup>

              <FormGroup>
                <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    value={values.user_info.phone_is_whatsapp}
                    onPress={() =>
                      setFieldValue(
                        'user_info.phone_is_whatsapp',
                        !values.user_info.phone_is_whatsapp,
                      )
                    }
                    checked={values.user_info.phone_is_whatsapp}
                  />
                  <Typography>{$t('isWhats')}</Typography>
                </Box>
              </FormGroup>
              <FormGroup>
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
                  onSubmitEditing={() => focusToNextField('passwordRef')}
                  ref={refs.postalCodeRef}
                  returnKeyType="done"
                  value={values.user_info.postal_code}
                  onChangeText={(value) => {
                    setFieldValue('user_info.postal_code', value);
                  }}
                  render={(props) => {
                    if (String(values.user_info.country_id) === '1')
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
                  <FormErrorMessage name="user_info.postal_code" />
                )}
              </FormGroup>
              <FormGroup>
                <PasswordTextInput
                  label={$t('password')}
                  maxLength={255}
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  onSubmitEditing={() => focusToNextField('confirmPasswordRef')}
                  ref={refs.passwordRef}
                  returnKeyType="next"
                  textContentType="password"
                  value={values.password}
                  blurOnSubmit={false}
                />
                <FormErrorMessage name="password" />
              </FormGroup>
              <FormGroup>
                <PasswordTextInput
                  enableEye={false}
                  label={$t('confirmPassword')}
                  maxLength={255}
                  onBlur={handleBlur('password_confirmation')}
                  onChangeText={handleChange('password_confirmation')}
                  onSubmitEditing={handleSubmit}
                  ref={refs.confirmPasswordRef}
                  returnKeyType="send"
                  textContentType="password"
                  value={values.password_confirmation}
                />
                <FormErrorMessage name="password_confirmation" />
              </FormGroup>

              <FormGroup>
                <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    value={values.privacy}
                    onPress={() => setFieldValue('privacy', !values.privacy)}
                    checked={values.privacy}
                  />
                  <Typography>{$t('iAcceptPrivacy')}</Typography>
                  <Typography
                    onPress={() => navigation.navigate('privacy-terms')}
                    color="textSecondary"
                    fontWeight="bold"
                  >
                    {$t('privacyTerms')}
                  </Typography>
                </Box>
                <FormErrorMessage name="privacy" />
              </FormGroup>

              <FormGroup>
                <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    value={values.useTerm}
                    onPress={() => setFieldValue('useTerm', !values.useTerm)}
                    checked={values.useTerm}
                    onBlur={handleBlur('useTerm')}
                  />
                  <Typography>{$t('iAcceptUseTerms')}</Typography>
                  <Typography
                    onPress={() => navigation.navigate('use-terms')}
                    color="textSecondary"
                    fontWeight="bold"
                  >
                    {$t('useTerms')}
                  </Typography>
                </Box>
                <FormErrorMessage name="useTerm" />
              </FormGroup>

              <FormGroup>
                <Button disabled={loading} loading={loading} onPress={handleSubmit}>
                  {$t('continueSignUp')}
                </Button>
              </FormGroup>
            </Container>
          </KeyboardAwareScrollView>
        </>
      )}
    </Formik>
  );
}

Form.propTypes = {
  countries: PropTypes.array.isRequired,
  isPostalCodeChecked: PropTypes.bool.isRequired,
  isValidPostalCode: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onChangePostalCode: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
