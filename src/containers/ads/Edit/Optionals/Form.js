import Button from '@components/Button';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import FormGroup from '@components/FormGroup';
import Icon from '@components/Icon';
import { SelectModal } from '@components/Select';
import useTranslation from '@i18n/';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Form({ initialValues, onSubmit, optionals, optionalsLoading, vehicleSavingLoading }) {
  const $t = useTranslation();
  const fixedContainerHeight = useFixedContainerHeight();

  return (
    <Formik
      initialValues={{ id: initialValues?.id, optionals: initialValues?.optionals }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            <Container style={{ paddingBottom: fixedContainerHeight }}>
              <FormGroup>
                <SelectModal
                  endAdornment={<Icon name="plus" />}
                  isMultiple
                  label={$t('selectOptions')}
                  labelKey="description"
                  loading={optionalsLoading}
                  onChange={(value) => setFieldValue('optionals', value)}
                  options={optionals}
                  value={values.optionals}
                  valueKey="id"
                />
              </FormGroup>
            </Container>
          </KeyboardAwareScrollView>
          <FixedContainer>
            <Button loading={vehicleSavingLoading} onPress={handleSubmit}>
              {$t('save')}
            </Button>
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
  vehicleSavingLoading: PropTypes.bool.isRequired,
};

export default Form;
