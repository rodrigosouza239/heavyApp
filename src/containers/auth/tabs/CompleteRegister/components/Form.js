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
import useTranslation from '@i18n/';
import { useTheme } from '@theme/';
import moment from 'moment';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import Typography from '@components/Typography';
import CheckBox from '@components/CheckBox';
import Box from '@components/Box';
import { useHeaderHeight } from '@react-navigation/stack';

function Form({
  countries,
  isPostalCodeChecked,
  isValidPostalCode,
  loading,
  onChangePostalCode,
  onSubmit,
  needed,
}) {
  const $t = useTranslation();
  const requiredMessage = $t('requiredField');
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    birth_date: Yup.string()
      .required(requiredMessage)
      .test('valid-date', $t('invalidDate'), (value) => {
        return moment(value, 'DD/MM/YYYY').isValid();
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
  });

  const refs = {
    countryRef: useRef(),
    postalCodeRef: useRef(),
    documentTypeRef: useRef(),
    documentNumberRef: useRef(),
    birthDateRef: useRef(),
    genreRef: useRef(),
    cellPhoneRef: useRef(),
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

  const { spacing } = useTheme();

  const headerHeight = useHeaderHeight();
  const extraHeight = headerHeight + spacing();

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

  const renderDocType = (errors, values, setFieldValue) => {
    if (needed?.find(({ id }) => id?.includes('document_type'))) {
      if (String(values.country_id) === '1') {
        return (
          <FormGroup>
            <SelectCollapsible
              icon="document"
              label={$t('whichDocument')}
              onChange={(value) => setFieldValue('document_type', value)}
              ref={refs.documentTypeRef}
              value={values.document_type}
              options={[
                { label: 'CNPJ', value: 'CNPJ' },
                { label: 'CPF', value: 'CPF' },
              ]}
            />
            {getErrorMessage(errors, 'document_type')}
          </FormGroup>
        );
      }
      return (
        <FormGroup>
          <SelectCollapsible
            icon="document"
            label={$t('whichDocument')}
            onChange={(value) => setFieldValue('document_type', value)}
            ref={refs.documentTypeRef}
            value={values.document_type}
            options={[
              { label: 'SSN', value: 'SSN' },
              { label: 'EIN', value: 'EIN' },
            ]}
          />
          {getErrorMessage(errors, 'document_type')}
        </FormGroup>
      );
    }
    return null;
  };

  return (
    <Formik
      initialValues={{
        country_id: '',
        document_number: '',
        document_type: '',
        postal_code: '',
        genre: '',
        birth_date: '',
        phone: '',
        phone_country: 'br',
        phone_is_whatsapp: false,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
        <>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always" extraHeight={extraHeight}>
            <Container>
              <Box py={3}>
                <Typography fontWeight="bold" color="textSecondary">
                  {$t('needSomeMoreData')}
                </Typography>
              </Box>
              <Box pb={3}>
                <Typography color="textSecondary">{$t('fullAccess')}</Typography>
              </Box>
              {needed?.find(({ id }) => id?.includes('country_id')) && (
                <FormGroup>
                  <SelectModal
                    endAdornment={<Icon name="plus" />}
                    label={$t('country')}
                    labelKey="description"
                    options={countries}
                    value={values.country_id}
                    valueKey="id"
                    onChange={(value) => {
                      setFieldValue('country_id', value);
                      if (value === '1') {
                        setFieldValue('phone_country', 'br');
                      } else {
                        setFieldValue('phone_country', 'us');
                      }
                    }}
                    icon="globe-americas"
                  />
                  {getErrorMessage(errors, 'country_id')}
                </FormGroup>
              )}
              {needed?.find(({ id }) => id?.includes('postal_code')) && (
                <FormGroup>
                  <TextInput
                    autoCompleteType="postal-code"
                    autoCorrect={false}
                    disabled={!values.country_id}
                    icon="map-marker"
                    keyboardType="numeric"
                    label={String(values.country_id) === '1' ? $t('zipCode') : 'ZIP'}
                    onBlur={() => {
                      handleBlur('postal_code');
                      onChangePostalCode({
                        postal_code: values.postal_code,
                        country_id: values.country_id,
                      });
                    }}
                    onSubmitEditing={() => focusToNextField('documentNumberRef')}
                    ref={refs.postalCodeRef}
                    returnKeyType="done"
                    value={values.postal_code}
                    onChangeText={(value) => {
                      setFieldValue('postal_code', value);
                    }}
                    render={(props) => {
                      if (String(values.country_id) === '1')
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
                  {values?.postal_code &&
                  (values.postal_code.length === postalCodeLength ||
                    values.postal_code.length === postalCodeLengthUsa) &&
                  isPostalCodeChecked &&
                  !isValidPostalCode ? (
                    <ErrorMessage>{$t('invalidZipCodeLabel')}</ErrorMessage>
                  ) : (
                    getErrorMessage(errors, 'postal_code')
                  )}
                </FormGroup>
              )}
              {renderDocType(errors, values, setFieldValue)}
              {needed?.find(({ id }) => id?.includes('document_number')) && (
                <FormGroup>
                  <TextInput
                    autoCompleteType="off"
                    autoCorrect={false}
                    icon="document"
                    label={$t('documentNumber')}
                    onBlur={handleBlur('document_number')}
                    onChangeText={handleChange('document_number')}
                    onSubmitEditing={() => focusToNextField('birthDateRef')}
                    ref={refs.documentNumberRef}
                    returnKeyType="done"
                    value={values.document_number}
                    keyboardType="numeric"
                    render={(props) => {
                      if (String(values.country_id) === '1')
                        return (
                          <TextInputMask
                            type={values.document_type === 'CPF' ? 'cpf' : 'cnpj'}
                            {...props}
                          />
                        );
                      return (
                        <TextInputMask
                          type="custom"
                          options={{
                            mask: values.document_type === 'SSN' ? '999999999' : '999999999',
                          }}
                          {...props}
                        />
                      );
                    }}
                  />
                  {getErrorMessage(errors, 'document_number')}
                </FormGroup>
              )}
              {needed?.find(({ id }) => id?.includes('birth_date')) && (
                <FormGroup>
                  <TextInput
                    autoCompleteType="off"
                    autoCorrect={false}
                    icon="calendar"
                    label={$t('dateBirth')}
                    onBlur={handleBlur('birth_date')}
                    onChangeText={handleChange('birth_date')}
                    onSubmitEditing={() => focusToNextField('genreRef')}
                    placeholder="dd/mm/yyyy"
                    ref={refs.birthDateRef}
                    returnKeyType="next"
                    value={values.birth_date}
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
                  {getErrorMessage(errors, 'birth_date')}
                </FormGroup>
              )}
              {needed?.find(({ id }) => id?.includes('genre')) && (
                <FormGroup>
                  <SelectCollapsible
                    icon="document"
                    label={$t('gender')}
                    onChange={(value) => setFieldValue('genre', value)}
                    ref={refs.genreRef}
                    value={values.genre}
                    options={[
                      { label: $t('male'), value: 'M' },
                      { label: $t('female'), value: 'F' },
                    ]}
                  />
                  {getErrorMessage(errors, 'genre')}
                </FormGroup>
              )}
              {needed?.find(({ id }) => id?.includes('phone')) && (
                <>
                  <FormGroup style={{ flexDirection: 'row' }}>
                    <Box style={{ width: '15%' }}>
                      <SelectFlagCollapsible
                        onChange={(value) => {
                          setFieldValue('phone', '');
                          setFieldValue('phone_country', value);
                        }}
                        ref={refs.cellPhoneCountryRef}
                        value={values.phone_country}
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
                        onBlur={handleBlur('phone')}
                        onChangeText={handleChange('phone')}
                        ref={refs.cellPhoneRef}
                        returnKeyType="done"
                        value={values.phone}
                        render={(props) => {
                          if (String(values?.phone_country) === 'br')
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
                      {getErrorMessage(errors, 'phone')}
                    </Box>
                  </FormGroup>
                  <FormGroup>
                    <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <CheckBox
                        value={values.phone_is_whatsapp}
                        onPress={() =>
                          setFieldValue('phone_is_whatsapp', !values.phone_is_whatsapp)
                        }
                        checked={values.phone_is_whatsapp}
                      />
                      <Typography>{$t('isWhats')}</Typography>
                    </Box>
                  </FormGroup>
                </>
              )}

              <FormGroup>
                <Button disabled={loading} loading={loading} onPress={handleSubmit}>
                  {$t('ready')}
                </Button>
                <Button
                  textColor="#000000"
                  customColor="#ffffff"
                  disabled={loading}
                  loading={loading}
                  onPress={() => navigation.goBack()}
                >
                  {$t('completeLater')}
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
