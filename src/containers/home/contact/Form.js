import Box from '@components/Box';
import Button from '@components/Button';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import FormErrorMessage from '@components/FormErrorMessage';
import FormGroup from '@components/FormGroup';
import Icon from '@components/Icon';
import { SelectModal } from '@components/Select';
import TextInput from '@components/TextInput';
import Typography from '@components/Typography';
import { useHeaderHeight } from '@react-navigation/stack';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import * as Yup from 'yup';
import useTranslation from '@i18n/';

function Form({ loading, onSubmit, user }) {
  const $t = useTranslation();

  const subjects = [
    {
      label: $t('contactSubjects.0'),
      value: $t('contactSubjects.0'),
    },
    {
      label: $t('contactSubjects.1'),
      value: $t('contactSubjects.1'),
    },
    {
      label: $t('contactSubjects.2'),
      value: $t('contactSubjects.2'),
    },
    {
      label: $t('contactSubjects.3'),
      value: $t('contactSubjects.3'),
    },
    {
      label: $t('contactSubjects.4'),
      value: $t('contactSubjects.4'),
    },
    {
      label: $t('contactSubjects.5'),
      value: $t('contactSubjects.5'),
    },
    {
      label: $t('contactSubjects.6'),
      value: $t('contactSubjects.6'),
    },
    {
      label: $t('contactSubjects.7'),
      value: $t('contactSubjects.7'),
    },
  ];

  const headerHeight = useHeaderHeight();

  const extraHeight = headerHeight;

  const requiredMessage = $t('requiredField');

  const validationSchema = Yup.object().shape({
    user_email: Yup.string().email($t('invalidEmail')).required(requiredMessage),
    message: Yup.string().required(requiredMessage),
    user_name: Yup.string().required(requiredMessage),
    subject: Yup.string().required(requiredMessage),
    user_phone: Yup.string().required(requiredMessage),
  });

  const fixedContainerHeight = useFixedContainerHeight();
  const { user_name, user_email, user_phone } = user;

  return (
    <Formik
      enableReinitialize
      initialValues={{ user_name, user_email, user_phone, subject: '', message: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always" extraHeight={extraHeight}>
            <Container style={{ paddingBottom: fixedContainerHeight }}>
              <Box mb={2}>
                <Typography
                  align="center"
                  color="textSecondary"
                  gutterBottom
                  uppercase
                  variant="h6"
                >
                  {$t('contactTitle')}
                </Typography>
                <Typography color="textSecondary" align="center">
                  {$t('contactDescription')}
                </Typography>
              </Box>
              <FormGroup>
                <TextInput
                  autoCompleteType="name"
                  icon="user"
                  label={$t('fullName')}
                  maxLength={255}
                  onBlur={handleBlur('user_name')}
                  onChangeText={handleChange('user_name')}
                  returnKeyType="next"
                  value={values.user_name}
                />
                <FormErrorMessage name="user_name" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  autoCapitalize="none"
                  autoCompleteType="email"
                  autoCorrect={false}
                  icon="envelope-open-text"
                  keyboardType="email-address"
                  label={$t('email')}
                  maxLength={255}
                  onBlur={handleBlur('user_email')}
                  onChangeText={handleChange('user_email')}
                  returnKeyType="next"
                  value={values.user_email}
                />
                <FormErrorMessage name="user_email" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  autoCompleteType="tel"
                  autoCorrect={false}
                  icon="mobile"
                  keyboardType="phone-pad"
                  label={$t('cellPhone')}
                  onBlur={handleBlur('user_phone')}
                  onChangeText={handleChange('user_phone')}
                  returnKeyType="next"
                  value={values.user_phone}
                  render={(props) => (
                    <TextInputMask
                      type="custom"
                      options={{
                        mask:
                          values.user_phone.length === 18
                            ? '+99 (99) 9999-9999'
                            : '+99 (99) 99999-9999',
                      }}
                      {...props}
                    />
                  )}
                />
                <FormErrorMessage name="user_phone" />
              </FormGroup>
              <FormGroup>
                <SelectModal
                  endAdornment={<Icon name="plus" />}
                  icon="file"
                  label={$t('subject')}
                  options={subjects}
                  value={values.subject}
                  onChange={(value) => {
                    setFieldValue('subject', value);
                  }}
                />
                <FormErrorMessage name="subject" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  autoCompleteType="off"
                  icon="envelope-open-text"
                  label={$t('message')}
                  maxLength={255}
                  multiline
                  onBlur={handleBlur('message')}
                  onChangeText={handleChange('message')}
                  returnKeyType="next"
                  value={values.message}
                />
                <FormErrorMessage name="message" />
              </FormGroup>
            </Container>
          </KeyboardAwareScrollView>
          <FixedContainer>
            <Button loading={loading} onPress={handleSubmit}>
              {$t('send')}
            </Button>
          </FixedContainer>
        </>
      )}
    </Formik>
  );
}

Form.defaultProps = {
  user: null,
};

Form.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user_name: PropTypes.string,
    user_email: PropTypes.string,
    user_phone: PropTypes.string,
  }),
};

export default Form;
