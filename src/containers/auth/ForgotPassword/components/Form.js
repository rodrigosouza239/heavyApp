import Button from '@components/Button';
import Container from '@components/Container';
import FormErrorMessage from '@components/FormErrorMessage';
import FormGroup from '@components/FormGroup';
import Loading from '@components/Loading';
import TextInput from '@components/TextInput';
import useTranslation from '@i18n/';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView } from 'react-native';
import * as yup from 'yup';

function Form({ onSubmit }) {
  const $t = useTranslation();
  const validationSchema = yup.object().shape({
    email: yup.string().email($t('invalidEmail')).required($t('requiredField')),
  });

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Container>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
            <>
              <FormGroup>
                <TextInput
                  autoCapitalize="none"
                  autoCompleteType="email"
                  autoCorrect={false}
                  icon="envelope-open-text"
                  keyboardType="email-address"
                  label={$t('email')}
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  value={values.email}
                />
                <FormErrorMessage name="email" />
              </FormGroup>
              <FormGroup>
                <Button disabled={isSubmitting} loading={isSubmitting} onPress={handleSubmit}>
                  {$t('recoverPassword')}
                </Button>
              </FormGroup>
              <Loading loading={isSubmitting} />
            </>
          )}
        </Formik>
      </Container>
    </ScrollView>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
