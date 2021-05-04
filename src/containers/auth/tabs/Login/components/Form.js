import Button from '@components/Button';
import Container from '@components/Container';
import FormErrorMessage from '@components/FormErrorMessage';
import FormGroup from '@components/FormGroup';
import TextInput from '@components/TextInput';
import PasswordTextInput from '@components/TextInput/Password';
import useTranslation from '@i18n';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as yup from 'yup';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

function Form({
  loading,
  onPressForgotPassword,
  onSkipLogin,
  onSubmit,
  facebookSubmit,
  googleSubmit,
  microsoftSubmit,
  appleSubmit,
  facebookLoading,
  googleLoading,
  microsoftLoading,
  appleLoading,
}) {
  const isLoading = loading || facebookLoading || googleLoading || microsoftLoading || appleLoading;
  const $t = useTranslation();
  const validationSchema = yup.object().shape({
    email: yup.string().email($t('invalidEmail')).required($t('requiredField')),
    password: yup.string().required($t('requiredField')),
  });

  const refs = {
    passwordRef: useRef(),
  };

  const focusToNextField = (nextField) => {
    const field = refs[nextField].current;
    field.focus();
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flex}
    >
      <Container style={styles.flex}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <View style={styles.flex}>
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
                    onSubmitEditing={() => focusToNextField('passwordRef')}
                    returnKeyType="next"
                  />
                  <FormErrorMessage name="email" />
                </FormGroup>
                <FormGroup>
                  <PasswordTextInput
                    label={$t('password')}
                    maxLength={255}
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit}
                    value={values.password}
                    ref={refs.passwordRef}
                  />
                  <FormErrorMessage name="password" />
                </FormGroup>
                <FormGroup>
                  <Button onPress={onPressForgotPassword} variant="text" arrow={false}>
                    {$t('forgotPassword')}
                  </Button>
                </FormGroup>
              </View>
              <FormGroup>
                <Button disabled={isLoading} loading={isLoading} onPress={handleSubmit}>
                  {$t('signIn')}
                </Button>
              </FormGroup>
              <Text style={{ textAlign: 'center', textTransform: 'uppercase', marginBottom: 20 }}>
                {$t('or')}
              </Text>
              <FormGroup>
                <Button
                  disabled={isLoading}
                  customColor="#3b5998"
                  vectorIcon={<FontAwesome name="facebook-square" size={24} color="white" />}
                  loading={isLoading}
                  onPress={facebookSubmit}
                >
                  {$t('signInFacebook')}
                </Button>
              </FormGroup>
              <FormGroup>
                <Button
                  disabled={isLoading}
                  customColor="#F7C325"
                  textColor="#000000"
                  vectorIcon={<FontAwesome name="google-plus-square" size={24} color="#000" />}
                  loading={isLoading}
                  onPress={googleSubmit}
                >
                  {$t('signInGoogle')}
                </Button>
              </FormGroup>
              {Platform.OS === 'ios' && (
                <FormGroup>
                  <Button
                    disabled={isLoading}
                    customColor="#000000"
                    vectorIcon={<FontAwesome name="apple" size={24} color="white" />}
                    loading={isLoading}
                    onPress={appleSubmit}
                  >
                    {$t('signInApple')}
                  </Button>
                </FormGroup>
              )}
              <FormGroup>
                <Button
                  disabled={isLoading}
                  customColor="#ffa500"
                  vectorIcon={<FontAwesome5 name="microsoft" size={24} color="white" />}
                  loading={isLoading}
                  onPress={microsoftSubmit}
                >
                  {$t('signInMicrosoft')}
                </Button>
              </FormGroup>
              <FormGroup disableGutter>
                <Button onPress={onSkipLogin} color="secondary">
                  {$t('skipSignIn')}
                </Button>
              </FormGroup>
            </>
          )}
        </Formik>
      </Container>
    </ScrollView>
  );
}

Form.propTypes = {
  loading: PropTypes.bool.isRequired,
  onPressForgotPassword: PropTypes.func.isRequired,
  onSkipLogin: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  facebookSubmit: PropTypes.func.isRequired,
  googleSubmit: PropTypes.func.isRequired,
  microsoftSubmit: PropTypes.func.isRequired,
  appleSubmit: PropTypes.func.isRequired,
  facebookLoading: PropTypes.bool.isRequired,
  googleLoading: PropTypes.bool.isRequired,
  microsoftLoading: PropTypes.bool.isRequired,
  appleLoading: PropTypes.bool.isRequired,
};

export default Form;
