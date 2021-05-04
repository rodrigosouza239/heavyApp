import Button from '@components/Button';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import FormErrorMessage from '@components/FormErrorMessage';
import FormGroup from '@components/FormGroup';
import Icon from '@components/Icon';
import { SelectModal } from '@components/Select';
import useTranslation from '@i18n/';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

function Form({
  brands,
  brandsLoading,
  cities,
  citiesLoading,
  countries,
  countriesLoading,
  fabricationYears,
  fabricationYearsLoading,
  initialValues,
  models,
  modelsLoading,
  onChangeBrand,
  onChangeCountry,
  onChangeModel,
  onChangeProductType,
  onChangeState,
  onSubmit,
  platforms,
  platformsLoading,
  productTypes,
  productTypesLoading,
  states,
  statesLoading,
  vehicleSavingLoading,
}) {
  const $t = useTranslation();
  const requiredMessage = $t('requiredField');

  const fixedContainerHeight = useFixedContainerHeight();

  const validationSchema = Yup.object().shape({
    brand_id: Yup.string().required(requiredMessage),
    city_id: Yup.string().required(requiredMessage),
    country_id: Yup.string().required(requiredMessage),
    fabrication_year: Yup.string().required(requiredMessage),
    model_id: Yup.string().required(requiredMessage),
    has_platform: Yup.boolean(),
    platform_id: Yup.string().when('has_platform', {
      is: true,
      then: Yup.string().required(requiredMessage),
      otherwise: Yup.string(),
    }),
    product_id: Yup.string().required(requiredMessage),
    state_id: Yup.string().required(requiredMessage),
  });

  const {
    brand_id,
    city_id,
    country_id,
    fabrication_year,
    has_platform,
    id,
    model_id,
    platform_id,
    product_id,
    state_id,
  } = initialValues;

  return (
    <Formik
      initialValues={{
        brand_id,
        city_id,
        country_id,
        fabrication_year,
        has_platform,
        id,
        model_id,
        platform_id,
        product_id,
        state_id,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
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
                  icon="tractor"
                  endAdornment={<Icon name="plus" />}
                  label={$t('product')}
                  labelKey="description"
                  loading={productTypesLoading}
                  options={productTypes}
                  value={values.product_id}
                  valueKey="id"
                  onChange={(value, item) => {
                    onChangeProductType(value, { item, setFieldValue });
                    setFieldValue('product_id', value);
                    setFieldValue('brand_id', '');
                    setFieldValue('model_id', '');
                    setFieldValue('platform_id', '');
                    setFieldValue('fabrication_year', '');
                  }}
                />
                <FormErrorMessage name="product_id" />
              </FormGroup>
              <FormGroup>
                <SelectModal
                  icon="tractor"
                  endAdornment={<Icon name="plus" />}
                  label={$t('brand')}
                  labelKey="description"
                  loading={brandsLoading}
                  options={brands}
                  value={values.brand_id}
                  valueKey="id"
                  onChange={(value) => {
                    onChangeBrand(value);
                    setFieldValue('brand_id', value);
                    setFieldValue('model_id', '');
                    setFieldValue('platform_id', '');
                    setFieldValue('fabrication_year', '');
                  }}
                />
                <FormErrorMessage name="brand_id" />
              </FormGroup>
              <FormGroup>
                <SelectModal
                  icon="tractor"
                  endAdornment={<Icon name="plus" />}
                  label={$t('model')}
                  labelKey="description"
                  options={models}
                  loading={modelsLoading}
                  value={values.model_id}
                  valueKey="id"
                  onChange={(value, item) => {
                    onChangeModel(value, item, setFieldValue);
                    setFieldValue('model_id', value);
                    setFieldValue('platform_id', '');
                    setFieldValue('fabrication_year', '');
                  }}
                />
                <FormErrorMessage name="model_id" />
              </FormGroup>
              {values.has_platform && (
                <FormGroup>
                  <SelectModal
                    icon="tractor"
                    endAdornment={<Icon name="plus" />}
                    label={$t('platform')}
                    labelKey="description"
                    options={platforms}
                    loading={platformsLoading}
                    value={values.platform_id}
                    valueKey="id"
                    onChange={(value) => {
                      setFieldValue('platform_id', value);
                    }}
                  />
                  <FormErrorMessage name="platform_id" />
                </FormGroup>
              )}
              <FormGroup>
                <SelectModal
                  icon="calendar"
                  endAdornment={<Icon name="plus" />}
                  label={$t('yearManufacture')}
                  labelKey="year"
                  loading={fabricationYearsLoading}
                  options={fabricationYears}
                  value={values.fabrication_year}
                  valueKey="year"
                  onChange={(value) => {
                    setFieldValue('fabrication_year', value);
                  }}
                />
                <FormErrorMessage name="fabrication_year" />
              </FormGroup>
              <FormGroup>
                <SelectModal
                  icon="globe-americas"
                  endAdornment={<Icon name="plus" />}
                  label={$t('country')}
                  labelKey="description"
                  loading={countriesLoading}
                  options={countries}
                  value={values.country_id}
                  valueKey="id"
                  onChange={(value) => {
                    onChangeCountry(value);
                    setFieldValue('country_id', value);
                    setFieldValue('state_id', '');
                    setFieldValue('city_id', '');
                  }}
                />
                <FormErrorMessage name="country_id" />
              </FormGroup>
              <FormGroup>
                <SelectModal
                  icon="building"
                  endAdornment={<Icon name="plus" />}
                  label={$t('state')}
                  labelKey="description"
                  loading={statesLoading}
                  options={states}
                  value={values.state_id}
                  valueKey="id"
                  onChange={(value) => {
                    onChangeState(value);
                    setFieldValue('state_id', value);
                    setFieldValue('city_id', '');
                  }}
                />
                <FormErrorMessage name="state_id" />
              </FormGroup>
              <FormGroup disableGutter>
                <SelectModal
                  endAdornment={<Icon name="plus" />}
                  label={$t('city')}
                  labelKey="description"
                  loading={citiesLoading}
                  options={cities}
                  value={values.city_id}
                  valueKey="id"
                  icon="map-marker"
                  onChange={(value) => {
                    setFieldValue('city_id', value);
                  }}
                />
                <FormErrorMessage name="city_id" />
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
  brands: PropTypes.array.isRequired,
  brandsLoading: PropTypes.bool.isRequired,
  cities: PropTypes.array.isRequired,
  citiesLoading: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  countriesLoading: PropTypes.bool.isRequired,
  fabricationYears: PropTypes.array.isRequired,
  fabricationYearsLoading: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
  models: PropTypes.array.isRequired,
  modelsLoading: PropTypes.bool.isRequired,
  onChangeBrand: PropTypes.func.isRequired,
  onChangeCountry: PropTypes.func.isRequired,
  onChangeModel: PropTypes.func.isRequired,
  onChangeProductType: PropTypes.func.isRequired,
  onChangeState: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  platforms: PropTypes.array.isRequired,
  platformsLoading: PropTypes.bool.isRequired,
  productTypes: PropTypes.array.isRequired,
  productTypesLoading: PropTypes.bool.isRequired,
  states: PropTypes.array.isRequired,
  statesLoading: PropTypes.bool.isRequired,
  vehicleSavingLoading: PropTypes.bool.isRequired,
};

export default Form;
