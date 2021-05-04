import Box from '@components/Box';
import Button from '@components/Button';
import CheckBox from '@components/CheckBox';
import Container from '@components/Container';
import FormErrorMessage from '@components/FormErrorMessage';
import FormGroup from '@components/FormGroup';
import Icon from '@components/Icon';
import { SelectModal } from '@components/Select';
import TextInput from '@components/TextInput';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import { Formik } from 'formik';
import moment from 'moment';
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

function Form({ onSubmit, initialValues, user }) {
  const $t = useTranslation();
  const requiredMessage = $t('requiredField');
  const navigation = useNavigation();
  const { vehicleLoading } = useSelector((state) => state.ad);

  const validationSchema = Yup.object().shape({
    agree_terms: Yup.boolean().oneOf([true], $t('termsAndConditionsMustBeAccepted')),
    card_cvv: Yup.string().required(requiredMessage),
    card_expiration: Yup.string()
      .required(requiredMessage)
      .test('valid-date', $t('dateInvalid'), (value) => {
        if (moment(value, 'MM/YY', true).isValid()) {
          return moment(value, 'MM/YY', true).isAfter(new Date());
        }
        return false;
      }),
    card_number: Yup.string().required(requiredMessage),
    sell_installment: Yup.string().required(requiredMessage),
    user_name: Yup.string().required(requiredMessage),
    user_email: Yup.string().email($t('invalidEmail')).required(requiredMessage),
  });

  const {
    plan: { installment },
  } = initialValues;

  const installments = Array.from(Array(installment || 1).keys()).map((i) => ({
    label: i + 1,
    value: i + 1,
  }));

  return (
    <Formik
      initialValues={{
        agree_terms: false,
        card_cvv: '',
        card_expiration: '',
        card_number: '',
        sell_installment: 1,
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
                  autoCompleteType="off"
                  autoCorrect={false}
                  label={$t('cardNumber')}
                  maxLength={60}
                  keyboardType="numeric"
                  onChangeText={handleChange('card_number')}
                  onBlur={handleBlur('card_number')}
                  render={(props) => <TextInputMask {...props} type="only-numbers" />}
                  value={values.card_number}
                  icon="document"
                />
                <FormErrorMessage name="card_number" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  label={$t('namePrintedOnCard')}
                  onBlur={handleBlur('user_name')}
                  maxLength={255}
                  onChangeText={handleChange('user_name')}
                  value={values.user_name}
                  icon="user"
                />
                <FormErrorMessage name="user_name" />
              </FormGroup>
              <Box style={styles.row}>
                <FormGroup style={styles.flex} mr={1}>
                  <TextInput
                    autoCompleteType="off"
                    autoCorrect={false}
                    label={$t('dueDate')}
                    icon="calendar"
                    onChangeText={handleChange('card_expiration')}
                    render={(props) => (
                      <TextInputMask
                        {...props}
                        type="datetime"
                        options={{
                          format: 'MM/YY',
                        }}
                      />
                    )}
                    value={values.card_expiration}
                  />
                  <FormErrorMessage name="card_expiration" />
                </FormGroup>
                <FormGroup style={styles.flex} ml={1}>
                  <TextInput
                    label={$t('cvv')}
                    onBlur={handleBlur('card_cvv')}
                    onChangeText={handleChange('card_cvv')}
                    value={values.card_cvv}
                    keyboardType="numeric"
                    render={(props) => <TextInputMask {...props} type="only-numbers" />}
                    icon="document"
                  />
                  <FormErrorMessage name="card_cvv" />
                </FormGroup>
              </Box>
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
                <SelectModal
                  endAdornment={<Icon name="plus" />}
                  label={$t('numberInstallments')}
                  onChange={(value) => setFieldValue('sell_installment', value)}
                  options={installments}
                  value={values.sell_installment}
                  icon="coins"
                />
                <FormErrorMessage name="sell_installment" />
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
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default Form;
