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
import * as Yup from 'yup';
import { TextInputMask } from 'react-native-masked-text';
import useTranslation from '@i18n/';

function Form({ onSubmit, initialValues, isRequired, progress }) {
  const $t = useTranslation();
  const requiredMessage = 'Campo obrigatório';

  const fixedContainerHeight = useFixedContainerHeight();

  const validationSchema = Yup.object().shape({
    motorhours: Yup.string(),
  });

  const validationRequiredSchema = Yup.object().shape({
    motorhours: Yup.string().required(requiredMessage),
  });

  const { motorhours } = initialValues;

  return (
    <Formik
      initialValues={{
        motorhours,
      }}
      onSubmit={onSubmit}
      validationSchema={isRequired ? validationRequiredSchema : validationSchema}
    >
      {({ handleSubmit, handleChange, values }) => (
        <>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="never"
          >
            {progress}
            <Container pt={0} style={{ paddingBottom: fixedContainerHeight }}>
              <FormGroup>
                <TextInput
                  autoCompleteType="off"
                  autoCorrect={false}
                  icon="clock"
                  label={$t('engineHours')}
                  maxLength={15}
                  keyboardType="numeric"
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  onChangeText={handleChange('motorhours')}
                  render={(props) => <TextInputMask {...props} type="money" />}
                  options={{
                    unit: '',
                    precision: 0,
                  }}
                  value={values.motorhours}
                />
                <FormErrorMessage name="motorhours" />
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
