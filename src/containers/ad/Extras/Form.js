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

function Form({ initialValues, extras, extrasLoading, onSubmit, progress }) {
  const $t = useTranslation();
  const fixedContainerHeight = useFixedContainerHeight();

  return (
    <Formik
      initialValues={{
        extras: initialValues.extras,
      }}
      onSubmit={onSubmit}
    >
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
                  title={`${$t('createAdTitles.whatAre')} ${$t('extraItems')} ${$t(
                    'createAdTitles.options',
                  )}`}
                  endAdornment={<Icon name="plus" />}
                  isMultiple
                  label={$t('selectExtraItems')}
                  labelKey="description"
                  onChange={(value) => setFieldValue('extras', value)}
                  loading={extrasLoading}
                  options={extras}
                  value={values.extras}
                  valueKey="id"
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
  extras: PropTypes.array.isRequired,
  extrasLoading: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  progress: PropTypes.element.isRequired,
};

export default Form;
