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
import * as Yup from 'yup';

function Form({ onSubmit, initialValues, progress }) {
  const $t = useTranslation();
  const requiredMessage = $t('requiredField');

  const fixedContainerHeight = useFixedContainerHeight();

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(requiredMessage),
  });

  const { description } = initialValues;

  return (
    <Formik initialValues={{ description }} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit, handleBlur, handleChange, values }) => (
        <>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="never"
            showsVerticalScrollIndicator={false}
          >
            {progress}
            <Container pt={0} style={{ paddingBottom: fixedContainerHeight }}>
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
};

export default Form;
