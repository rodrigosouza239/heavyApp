import { isValidCEP, isValidCNPJ, isValidCPF } from '@brazilian-utils/brazilian-utils';
import Button from '@components/Button';
import CheckBox from '@components/CheckBox';
import Container from '@components/Container';
import ErrorMessage from '@components/ErrorMessage';
import FormErrorMessage from '@components/FormErrorMessage';
import FormGroup from '@components/FormGroup';
import Icon from '@components/Icon';
import { SelectCollapsible, SelectModal } from '@components/Select';
import TextInput from '@components/TextInput';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  terms: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
});

function Form({
  countries,
  countriesLoading,
  isPostalCodeChecked,
  isValidPostalCode,
  onChangeZipCode,
  onSubmit,
  user,
}) {
  const { vehicleLoading } = useSelector((state) => state.ad);
  const $t = useTranslation();
  const POSTAL_CODE_LENGTH = 9;
  const requiredMessage = $t('requiredField');
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    address_city: Yup.string().required(requiredMessage),
    address_country: Yup.string().required(requiredMessage),
    address_district: Yup.string().required(requiredMessage),
    address_number: Yup.string().required(requiredMessage),
    address_state: Yup.string().required(requiredMessage),
    address_street: Yup.string().required(requiredMessage),
    agree_terms: Yup.boolean().oneOf([true], $t('termsAndConditionsMustBeAccepted')),
    document_type: Yup.string().required(requiredMessage),
    user_email: Yup.string().email($t('invalidEmail')).required(requiredMessage),
    user_name: Yup.string().required(requiredMessage),
    address_zipcode: Yup.string()
      .required(requiredMessage)
      .test('valid-postal-code', $t('invalidZipCode'), (value) => {
        return isValidCEP(value);
      }),
    document_number: Yup.string().when('document_type', {
      is: 'CPF',
      then: Yup.string()
        .required(requiredMessage)
        .test('valid-cpf', $t('invalidCPF'), (value) => {
          return isValidCPF(value);
        }),
      otherwise: Yup.string()
        .required(requiredMessage)
        .test('valid-cnpj', $t('invalidCNPJ'), (value) => {
          return isValidCNPJ(value);
        }),
    }),
  });

  return (
    <Formik
      initialValues={{
        address_city: user.address_city,
        address_complement: '',
        address_country: user.address_country,
        address_district: user?.address_district,
        address_number: user?.address_number,
        address_state: user?.address_state,
        address_street: user?.address_street,
        address_zipcode: user.address_zipcode,
        agree_terms: false,
        document_number: user.document_number,
        document_type: user.document_type,
        user_email: user.email,
        user_name: user.name,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, handleBlur, handleChange, values, setFieldValue }) => (
        <>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="never"
          >
            <Container>
              <FormGroup>
                <TextInput
                  autoCorrect={false}
                  label={$t('fullName')}
                  onBlur={handleBlur('user_name')}
                  maxLength={255}
                  onChangeText={handleChange('user_name')}
                  value={values.user_name}
                  icon="user"
                />
                <FormErrorMessage name="user_name" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  autoCapitalize="none"
                  autoCompleteType="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  label={$t('email')}
                  onBlur={handleBlur('user_email')}
                  onChangeText={handleChange('user_email')}
                  value={values.user_email}
                  returnKeyType="next"
                  icon="envelope-open-text"
                />
                <FormErrorMessage name="user_email" />
              </FormGroup>
              <FormGroup>
                <SelectCollapsible
                  label={$t('whatTypeOfDocument')}
                  onChange={(value) => setFieldValue('document_type', value)}
                  value={values.document_type}
                  options={[
                    { label: 'CNPJ', value: 'CNPJ' },
                    { label: 'CPF', value: 'CPF' },
                  ]}
                  icon="document"
                />
                <FormErrorMessage name="document_type" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  autoCompleteType="off"
                  autoCorrect={false}
                  label={$t('documentNumber')}
                  onBlur={handleBlur('document_number')}
                  onChangeText={handleChange('document_number')}
                  returnKeyType="next"
                  value={values.document_number}
                  render={(props) => (
                    <TextInputMask
                      type={values.document_type === 'CPF' ? 'cpf' : 'cnpj'}
                      {...props}
                    />
                  )}
                  icon="document"
                />
                <FormErrorMessage name="document_number" />
              </FormGroup>
              <FormGroup>
                <SelectModal
                  endAdornment={<Icon name="plus" />}
                  label={$t('country')}
                  labelKey="description"
                  loading={countriesLoading}
                  options={countries}
                  value={values.address_country}
                  valueKey="id"
                  onChange={(value) => {
                    setFieldValue('address_city', '');
                    setFieldValue('address_country', value);
                    setFieldValue('address_district', '');
                    setFieldValue('address_state', '');
                    setFieldValue('address_street', '');
                    setFieldValue('address_zipcode', '');
                  }}
                  icon="globe-americas"
                />
                <FormErrorMessage name="address_country" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  autoCompleteType="postal-code"
                  autoCorrect={false}
                  disabled={!values.address_country}
                  keyboardType="numeric"
                  label={$t('zipCode')}
                  onBlur={handleBlur('address_zipcode')}
                  onChangeText={(postalCode) => {
                    setFieldValue('address_city', '');
                    setFieldValue('address_district', '');
                    setFieldValue('address_state', '');
                    setFieldValue('address_street', '');
                    setFieldValue('address_zipcode', postalCode);
                    onChangeZipCode({
                      postal_code: postalCode,
                      country_id: values.address_country,
                      setFieldValue,
                    });
                  }}
                  render={(props) => <TextInputMask type="zip-code" {...props} />}
                  value={values.address_zipcode}
                  icon="map-marker"
                />
                {values?.address_zipcode?.length === POSTAL_CODE_LENGTH &&
                isPostalCodeChecked &&
                !isValidPostalCode ? (
                  <ErrorMessage>{$t('invalidZipCode')}</ErrorMessage>
                ) : (
                  <FormErrorMessage name="address_zipcode" />
                )}
              </FormGroup>
              <FormGroup>
                <TextInput
                  label={$t('street')}
                  maxLength={255}
                  onBlur={handleBlur('address_street')}
                  onChangeText={handleChange('address_street')}
                  value={values.address_street}
                  icon="map-marker"
                />
                <FormErrorMessage name="address_street" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  autoCompleteType="off"
                  autoCorrect={false}
                  keyboardType="numeric"
                  label={$t('number')}
                  maxLength={9}
                  onBlur={handleBlur('address_number')}
                  onChangeText={handleChange('address_number')}
                  render={(props) => <TextInputMask {...props} type="only-numbers" />}
                  value={values.address_number}
                  icon="map-marker"
                />
                <FormErrorMessage name="address_number" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  label={$t('neighborhood')}
                  maxLength={255}
                  onBlur={handleBlur('address_district')}
                  onChangeText={handleChange('address_district')}
                  value={values.address_district}
                  icon="building"
                />
                <FormErrorMessage name="address_district" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  label={$t('city')}
                  maxLength={255}
                  onBlur={handleBlur('address_city')}
                  onChangeText={handleChange('address_city')}
                  value={values.address_city}
                  icon="map-marker"
                />
                <FormErrorMessage name="address_city" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  label={$t('state')}
                  maxLength={255}
                  onBlur={handleBlur('address_state')}
                  onChangeText={handleChange('address_state')}
                  value={values.address_state}
                  icon="map-marker"
                />
                <FormErrorMessage name="address_state" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  label={$t('complement')}
                  maxLength={255}
                  onBlur={handleBlur('address_complement')}
                  onChangeText={handleChange('address_complement')}
                  value={values.address_complement}
                  icon="map-marker"
                />
                <FormErrorMessage name="address_complement" />
              </FormGroup>
              <FormGroup disableGutter>
                <Typography align="center" variant="caption" color="textSecondary">
                  {$t('paymentTimeInstructions.paymentValidation')}{' '}
                  <Typography variant="caption" color="textSecondary" fontWeight="bold">
                    {$t('paymentTimeInstructions.not')}
                  </Typography>{' '}
                  {$t('paymentTimeInstructions.beImmediate')}
                </Typography>
              </FormGroup>
              <View>
                <FormGroup style={[styles.row, styles.terms]} disableGutter>
                  <CheckBox
                    onPress={() => setFieldValue('agree_terms', !values.agree_terms)}
                    checked={values.agree_terms}
                  />
                  <Typography variant="caption" color="textSecondary">
                    {$t('paymentReadTerms.iRead')}{' '}
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      fontWeight="bold"
                      onPress={() => navigation.navigate('home-payment-terms')}
                    >
                      {$t('paymentReadTerms.terms')}
                    </Typography>{' '}
                    {$t('paymentReadTerms.adherence')}
                  </Typography>
                </FormGroup>
                <FormGroup>
                  <View style={{ alignSelf: 'center' }}>
                    <FormErrorMessage name="agree_terms" />
                  </View>
                </FormGroup>
                <FormGroup disableGutter>
                  <Button disabled={vehicleLoading} onPress={handleSubmit}>
                    {$t('checkout')}
                  </Button>
                </FormGroup>
              </View>
            </Container>
          </KeyboardAwareScrollView>
        </>
      )}
    </Formik>
  );
}

Form.propTypes = {
  countries: PropTypes.array.isRequired,
  countriesLoading: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  isPostalCodeChecked: PropTypes.bool.isRequired,
  isValidPostalCode: PropTypes.bool.isRequired,
  onChangeZipCode: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Form;
