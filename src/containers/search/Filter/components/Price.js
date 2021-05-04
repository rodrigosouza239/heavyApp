import Button from '@components/Button';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import FormErrorMessage from '@components/FormErrorMessage';
import FormGroup from '@components/FormGroup';
import TextInput from '@components/TextInput';
import useTranslation from '@i18n/';
import { useNavigation } from '@react-navigation/native';
import { removeAllNonNumeric } from '@utils/';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import * as Yup from 'yup';

function Price({ route }) {
  const [initialValues, setInitialValues] = useState({
    price_start: 'R$ 0,00',
    price_end: 'R$ 0,00',
  });

  const navigation = useNavigation();
  const $t = useTranslation();

  useEffect(() => {
    const { prices } = route.params;

    function setPrices() {
      setInitialValues(prices);
    }

    setPrices();
  }, []);

  const handleSubmitForm = (values) => {
    navigation.navigate('search-home', { prices: values });
  };

  const refs = {
    price_start: useRef(),
    price_end: useRef(),
  };

  const focusToNextField = (nextField) => {
    const field = refs[nextField].current;

    try {
      field.root.getElement().focus();
    } catch {
      // no feedback
    }
  };

  function validatePrices(price_end) {
    const {
      parent: { price_start },
    } = this;

    if (price_end === 'R$ 0,00' && price_start === 'R$ 0,00') {
      return true;
    }

    return (
      Number.parseInt(removeAllNonNumeric(price_end), 10) >=
      Number.parseInt(removeAllNonNumeric(price_start), 10)
    );
  }

  const validationSchema = Yup.object().shape({
    price_end: Yup.string().test(
      'price_end',
      'Valor máximo deve ser maior que o mínimo',
      validatePrices,
    ),
  });

  const fixedContainerHeight = useFixedContainerHeight();

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, handleBlur, handleChange, values }) => (
        <>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
            <Container style={{ paddingBottom: fixedContainerHeight }}>
              <FormGroup>
                <TextInput
                  autoCompleteType="off"
                  autoCorrect={false}
                  icon="dollar-sign"
                  label={$t('minimumPrice')}
                  maxLength={14}
                  onBlur={handleBlur('price_start')}
                  onChangeText={handleChange('price_start')}
                  onSubmitEditing={() => focusToNextField('price_end')}
                  ref={refs.price_start}
                  render={(props) => <TextInputMask {...props} type="money" />}
                  returnKeyType="next"
                  value={values.price_start}
                  options={{
                    unit: $t('currencyUnit'),
                  }}
                />
                <FormErrorMessage name="price_start" />
              </FormGroup>
              <FormGroup>
                <TextInput
                  autoCompleteType="off"
                  autoCorrect={false}
                  icon="dollar-sign"
                  label={$t('maximumPrice')}
                  maxLength={14}
                  onBlur={handleBlur('price_end')}
                  onChangeText={handleChange('price_end')}
                  onSubmitEditing={handleSubmit}
                  ref={refs.price_end}
                  render={(props) => <TextInputMask {...props} type="money" />}
                  returnKeyType="send"
                  value={values.price_end}
                  options={{
                    unit: $t('currencyUnit'),
                  }}
                />
                <FormErrorMessage name="price_end" />
              </FormGroup>
            </Container>
          </KeyboardAwareScrollView>
          <FixedContainer>
            <Button onPress={handleSubmit}>{$t('save')}</Button>
          </FixedContainer>
        </>
      )}
    </Formik>
  );
}

Price.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Price;
