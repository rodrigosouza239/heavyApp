import Button from '@components/Button';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import FormErrorMessage from '@components/FormErrorMessage';
import FormGroup from '@components/FormGroup';
import PasswordTextInput from '@components/TextInput/Password';
import useTranslation from '@i18n/';
import { useHeaderHeight } from '@react-navigation/stack';
import { useTheme } from '@theme';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

function Form({ onSubmit }) {
  const $t = useTranslation();
  const headerHeight = useHeaderHeight();

  const { spacing } = useTheme();

  const extraHeight = headerHeight + spacing();

  const requiredMessage = 'Campo obrigatório';

  const validationSchema = Yup.object().shape({
    password: Yup.string().required(requiredMessage),
    new_password: Yup.string().required(requiredMessage),
  });

  const refs = {
    newPasswordRef: useRef(),
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

  return (
    <Formik
      enableReinitialize
      initialValues={{ password: '', new_password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
        <>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always" extraHeight={extraHeight}>
            <Container style={{ paddingBottom: fixedContainerHeight }}>
              <FormGroup>
                <PasswordTextInput
                  label={$t('currentPassword')}
                  maxLength={255}
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  onSubmitEditing={() => focusToNextField('newPasswordRef')}
                  returnKeyType="next"
                  textContentType="password"
                  value={values.password}
                />
                <FormErrorMessage name="password" />
              </FormGroup>
              <FormGroup>
                <PasswordTextInput
                  label={$t('newPassword')}
                  maxLength={255}
                  onBlur={handleBlur('new_password')}
                  onChangeText={handleChange('new_password')}
                  onSubmitEditing={handleSubmit}
                  ref={refs.newPasswordRef}
                  returnKeyType="send"
                  textContentType="newPassword"
                  value={values.new_password}
                />
                <FormErrorMessage name="new_password" />
              </FormGroup>
            </Container>
          </KeyboardAwareScrollView>
          <FixedContainer>
            <Button loading={isSubmitting} onPress={handleSubmit}>
              {$t('changePassword')}
            </Button>
          </FixedContainer>
        </>
      )}
    </Formik>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
