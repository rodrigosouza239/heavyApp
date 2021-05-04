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

function Form({ initialValues, extras, extrasLoading, onSubmit, vehicleSavingLoading }) {
  const fixedContainerHeight = useFixedContainerHeight();
  const $t = useTranslation();

  return (
    <Formik
      initialValues={{ id: initialValues?.id, extras: initialValues?.extras }}
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
                  label={$t('selectExtraItems')}
                  labelKey="description"
                  loading={extrasLoading}
                  onChange={(value) => setFieldValue('extras', value)}
                  options={extras}
                  value={values.extras}
                  valueKey="id"
                />
              </FormGroup>
            </Container>
          </KeyboardAwareScrollView>
          <FixedContainer>
            <Button loading={vehicleSavingLoading} onPress={handleSubmit}>
              Salvar
            </Button>
          </FixedContainer>
        </>
      )}
    </Formik>
  );
}

Form.propTypes = {
  extras: PropTypes.array.isRequired,
  extrasLoading: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  vehicleSavingLoading: PropTypes.bool.isRequired,
};

export default Form;
