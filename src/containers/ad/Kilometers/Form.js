import Button from '@components/Button';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import FormErrorMessage from '@components/FormErrorMessage';
import FormGroup from '@components/FormGroup';
import TextInput from '@components/TextInput';
import useTranslation from '@i18n/';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import * as Yup from 'yup';

function Form({ onSubmit, initialValues, isRequired, progress }) {
  const $t = useTranslation();
  const requiredMessage = $t('requiredField');

  const fixedContainerHeight = useFixedContainerHeight();

  const validationSchema = Yup.object().shape({
    mileage: Yup.string(),
  });

  const validationRequiredSchema = Yup.object().shape({
    mileage: Yup.string().required(requiredMessage),
  });

  const { mileage } = initialValues;

  return (
    <Formik
      initialValues={{
        mileage,
      }}
      onSubmit={onSubmit}
      validationSchema={isRequired ? validationRequiredSchema : validationSchema}
    >
      {({ handleSubmit, handleChange, values }) => (
        <>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="never"
            showsVerticalScrollIndicator={false}
          >
            {progress}
            <Container pt={0} style={{ paddingBottom: fixedContainerHeight }}>
              <FormGroup>
                <TextInput
                  autoCompleteType="off"
                  autoCorrect={false}
                  icon="tachometer-fast"
                  keyboardType="numeric"
                  label={$t('kilometersTraveled')}
                  maxLength={15}
                  onChangeText={handleChange('mileage')}
                  onSubmitEditing={handleSubmit}
                  render={(props) => <TextInputMask {...props} type="money" />}
                  returnKeyType="done"
                  options={{
                    unit: '',
                    precision: 0,
                  }}
                  value={values.mileage}
                />
                <FormErrorMessage name="mileage" />
              </FormGroup>
            </Container>
          </KeyboardAwareScrollView>
          <FixedContainer>
            <Button onPress={handleSubmit}>{$t('continue')}</Button>
          </FixedContainer>
        </>
      )}
    </Formik>
  );
}

Form.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  progress: PropTypes.element.isRequired,
  isRequired: PropTypes.bool.isRequired,
};

export default Form;
