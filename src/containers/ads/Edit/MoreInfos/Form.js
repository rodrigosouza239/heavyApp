import Button from '@components/Button';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import FormErrorMessage from '@components/FormErrorMessage';
import FormGroup from '@components/FormGroup';
import TextInput from '@components/TextInput';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import * as Yup from 'yup';
import { useMaskedPrice } from '@utils/';
import useTranslation from '@i18n/';

function Form({ initialValues, onSubmit, vehicleSavingLoading }) {
  const $t = useTranslation();
  const requiredMessage = $t('requiredField');

  const fixedContainerHeight = useFixedContainerHeight();

  const {
    id,
    description,
    has_mileage,
    has_motorhours,
    has_trackhours,
    mileage,
    motorhours,
    price,
    trackhours,
  } = initialValues;

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(requiredMessage),
    motorhours: has_motorhours ? Yup.string().required(requiredMessage) : Yup.string(),
    trackhours: has_trackhours ? Yup.string().required(requiredMessage) : Yup.string(),
    mileage: has_mileage ? Yup.string().required(requiredMessage) : Yup.string(),
    price: Yup.string().test('price', requiredMessage, (value) => {
      if (!value || value === 'R$ 0,00') {
        return false;
      }
      return true;
    }),
  });

  const maskedPrice = useMaskedPrice(price);

  return (
    <Formik
      initialValues={{ id, description, motorhours, mileage, price: maskedPrice, trackhours }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, handleBlur, handleChange, values }) => (
        <>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            <Container style={{ paddingBottom: fixedContainerHeight }}>
              <FormGroup>
                <TextInput
                  icon="file"
                  label={$t('productDescription')}
                  multiline
                  onBlur={handleBlur('description')}
                  onChangeText={handleChange('description')}
                  value={values.description}
                />
                <FormErrorMessage name="description" />
              </FormGroup>
              {has_motorhours && (
                <FormGroup>
                  <TextInput
                    autoCompleteType="off"
                    autoCorrect={false}
                    icon="clock"
                    keyboardType="numeric"
                    label={$t('engineHours')}
                    maxLength={9}
                    onChangeText={handleChange('motorhours')}
                    render={(props) => <TextInputMask {...props} type="only-numbers" />}
                    value={values.motorhours}
                  />
                  <FormErrorMessage name="motorhours" />
                </FormGroup>
              )}
              {has_trackhours && (
                <FormGroup>
                  <TextInput
                    autoCompleteType="off"
                    autoCorrect={false}
                    icon="clock"
                    keyboardType="numeric"
                    label={$t('trackHours')}
                    maxLength={9}
                    onChangeText={handleChange('trackhours')}
                    render={(props) => <TextInputMask {...props} type="only-numbers" />}
                    value={values.trackhours}
                  />
                  <FormErrorMessage name="trackhours" />
                </FormGroup>
              )}
              {has_mileage && (
                <FormGroup>
                  <TextInput
                    autoCompleteType="off"
                    autoCorrect={false}
                    icon="tachometer-fast"
                    keyboardType="numeric"
                    label={$t('kilometersTraveled')}
                    maxLength={9}
                    onChangeText={handleChange('mileage')}
                    render={(props) => <TextInputMask {...props} type="only-numbers" />}
                    value={values.mileage}
                  />
                  <FormErrorMessage name="mileage" />
                </FormGroup>
              )}
              <FormGroup>
                <TextInput
                  autoCompleteType="off"
                  autoCorrect={false}
                  icon="dollar-sign"
                  label={$t('adValue')}
                  maxLength={14}
                  onChangeText={handleChange('price')}
                  onSubmitEditing={handleSubmit}
                  render={(props) => <TextInputMask {...props} type="money" />}
                  returnKeyType="done"
                  value={values.price}
                  options={{
                    unit: $t('currencyUnit'),
                    precision: 2,
                  }}
                />
                <FormErrorMessage name="price" />
              </FormGroup>
            </Container>
          </KeyboardAwareScrollView>
          <FixedContainer>
            <Button loading={vehicleSavingLoading} onPress={handleSubmit}>
              {$t('save')}
            </Button>
          </FixedContainer>
        </>
      )}
    </Formik>
  );
}

Form.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  vehicleSavingLoading: PropTypes.bool.isRequired,
};

export default Form;
