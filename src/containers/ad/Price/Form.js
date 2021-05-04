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

function Form({ onSubmit, initialValues, progress }) {
  const $t = useTranslation();
  const requiredMessage = $t('requiredField');

  const fixedContainerHeight = useFixedContainerHeight();

  const validationSchema = Yup.object().shape({
    price: Yup.string().test('price', requiredMessage, (value) => {
      if (!value || value === 'R$ 0,00') {
        return false;
      }
      return true;
    }),
  });

  const { price } = initialValues;

  return (
    <Formik
      initialValues={{
        price,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
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
                  icon="dollar-sign"
                  label={$t('adValue')}
                  maxLength={17}
                  onChangeText={handleChange('price')}
                  onSubmitEditing={handleSubmit}
                  render={(props) => <TextInputMask {...props} type="money" />}
                  returnKeyType="done"
                  value={values.price}
                  options={{
                    unit: $t('currencyUnit'),
                  }}
                />
                <FormErrorMessage name="price" />
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
