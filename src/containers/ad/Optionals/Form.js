import Button from '@components/Button';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import FormGroup from '@components/FormGroup';
import Icon from '@components/Icon';
import { SelectModal } from '@components/Select';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useTranslation from '@i18n/';

function Form({ initialValues, onSubmit, optionals, optionalsLoading, progress }) {
  const $t = useTranslation();
  const fixedContainerHeight = useFixedContainerHeight();

  return (
    <Formik initialValues={{ optionals: initialValues.optionals }} onSubmit={onSubmit}>
      {({ handleSubmit, values, setFieldValue }) => (
        <>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            {progress}
            <Container pt={0} style={{ paddingBottom: fixedContainerHeight }}>
              <FormGroup>
                <SelectModal
                  title={`${$t('createAdTitles.whatAre')} ${$t('createAdTitles.yourProduct')} ${$t(
                    'createAdTitles.options',
                  )}`}
                  isMultiple
                  endAdornment={<Icon name="plus" />}
                  label={$t('selectOptions')}
                  onChange={(value) => setFieldValue('optionals', value)}
                  valueKey="id"
                  labelKey="description"
                  value={values.optionals}
                  options={optionals}
                  loading={optionalsLoading}
                />
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
  optionals: PropTypes.array.isRequired,
  optionalsLoading: PropTypes.bool.isRequired,
  progress: PropTypes.element.isRequired,
};

export default Form;
