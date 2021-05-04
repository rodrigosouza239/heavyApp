import Button from '@components/Button';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import FormGroup from '@components/FormGroup';
import Icon from '@components/Icon';
import SelectModal from '@components/Select/SelectModal';
import TextInputAsButton from '@components/TextInput/TextInputAsButton';
import useTranslation from '@i18n/';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Form({
  brands,
  brandsLoading,
  cities,
  citiesLoading,
  loading,
  location,
  models,
  modelsLoading,
  onChangeBrand,
  onChangeModel,
  onChangeProductType,
  onResetForm,
  onSubmit,
  prices,
  products,
  productsLoading,
  states,
  statesLoading,
  years,
  yearsLoading,
  countriesLoading,
  product_id,
  getBrandsByProductId,
}) {
  const $t = useTranslation();
  const navigation = useNavigation();
  const scroll = React.useRef(null);
  const formikRef = useRef();
  const dispatch = useDispatch();

  useScrollToTop(scroll);

  useEffect(() => {
    if (product_id) {
      if (product_id !== formikRef.current?.values?.product_id) {
        formikRef.current.setFieldValue('product_id', product_id);
        formikRef.current.setFieldValue('brand_id', '');
        formikRef.current.setFieldValue('model_id', '');
        formikRef.current.setFieldValue('fabrication_year', '');
        dispatch(getBrandsByProductId(product_id));
      }
    }
  }, [product_id]);

  const handlePressLocation = () => {
    navigation.navigate('search-location', { location });
  };

  const handlePressPrice = () => {
    navigation.navigate('search-price', { prices });
  };

  const getLocationDescription = () => {
    const { city_id, state_id } = location;

    const selectedState = states.find((state) => `${state.id}` === `${state_id}`);
    const selectedCity = cities.find((city) => `${city.id}` === `${city_id}`);

    return [selectedState, selectedCity]
      .filter((item) => !!item)
      .map((item) => item.description)
      .join(' - ');
  };

  const getPriceDescription = () => {
    const { price_start, price_end } = prices;

    if (
      (price_start && price_start !== $t('priceZero')) ||
      (price_end && price_end !== $t('priceZero'))
    ) {
      return `${price_start} - ${price_end}`;
    }

    return '';
  };

  const advertisers = [
    { label: $t('publishedByPerson'), value: 'CPF' },
    { label: $t('publishedByStore'), value: 'CNPJ' },
  ];

  const advertisersUsa = [
    { label: $t('publishedByPerson'), value: 'SSN' },
    { label: $t('publishedByStore'), value: 'EIN' },
  ];

  const handleResetForm = (resetForm) => {
    resetForm();
    if (onResetForm) {
      onResetForm();
    }
  };

  const fixedContainerHeight = useFixedContainerHeight(2);

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize
      initialValues={{
        document_type: [],
        brand_id: '',
        fabrication_year: '',
        model_id: '',
        price_end: $t('priceZero'),
        price_start: $t('priceZero'),
        product_id: '',
      }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, setFieldValue, resetForm }) => (
        <>
          <KeyboardAwareScrollView ref={scroll} keyboardShouldPersistTaps="always">
            <Container style={{ paddingBottom: fixedContainerHeight }}>
              <FormGroup>
                <SelectModal
                  disabled={productsLoading}
                  endAdornment={<Icon disabled={productsLoading} name="plus" />}
                  label={$t('product')}
                  labelKey="description"
                  options={products}
                  value={values.product_id}
                  valueKey="id"
                  onChange={(value) => {
                    setFieldValue('product_id', value);
                    setFieldValue('brand_id', '');
                    setFieldValue('model_id', '');
                    setFieldValue('fabrication_year', '');
                    onChangeProductType(value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <SelectModal
                  isMultiple
                  onChange={(value) => {
                    setFieldValue(
                      'brand_id',
                      _.uniqBy(value, (e) => e),
                    );
                    setFieldValue('model_id', '');
                    setFieldValue('fabrication_year', '');
                    onChangeBrand(_.uniqBy(value, (e) => e));
                  }}
                  disabled={brandsLoading}
                  endAdornment={<Icon disabled={brandsLoading} name="plus" />}
                  label={$t('brand')}
                  labelKey="description"
                  options={brands}
                  value={values.brand_id}
                  valueKey="id"
                />
              </FormGroup>
              <FormGroup>
                <SelectModal
                  isMultiple
                  onChange={(value) => {
                    setFieldValue(
                      'model_id',
                      _.uniqBy(value, (e) => e),
                    );
                    setFieldValue('fabrication_year', '');
                    onChangeModel(value);
                  }}
                  disabled={modelsLoading}
                  endAdornment={<Icon disabled={modelsLoading} name="plus" />}
                  label={$t('model')}
                  labelKey="description"
                  options={models}
                  value={values.model_id}
                  valueKey="id"
                />
              </FormGroup>
              <FormGroup>
                <SelectModal
                  disabled={yearsLoading}
                  endAdornment={<Icon disabled={yearsLoading} name="plus" />}
                  label={$t('year')}
                  labelKey="year"
                  onChange={(value) => {
                    setFieldValue('fabrication_year', value);
                  }}
                  options={years}
                  value={values.fabrication_year}
                  valueKey="year"
                />
              </FormGroup>
              <FormGroup>
                <TextInputAsButton
                  endAdornment={
                    <Icon
                      disabled={citiesLoading || statesLoading || countriesLoading}
                      name="arrow-circle"
                    />
                  }
                  disabled={citiesLoading || statesLoading || countriesLoading}
                  label={$t('location')}
                  onPress={handlePressLocation}
                  value={getLocationDescription()}
                />
              </FormGroup>
              <FormGroup>
                <TextInputAsButton
                  endAdornment={<Icon name="arrow-circle" />}
                  label={$t('price')}
                  onPress={handlePressPrice}
                  value={getPriceDescription()}
                />
              </FormGroup>
              <FormGroup disableGutter>
                <SelectModal
                  endAdornment={<Icon name="plus" />}
                  isMultiple
                  label={$t('published')}
                  onChange={(value) => {
                    setFieldValue('document_type', value);
                  }}
                  value={values.document_type}
                  options={location?.country_id === 1 ? advertisers : advertisersUsa}
                />
              </FormGroup>
              <FormGroup disableGutter>
                <Button
                  color="secondary"
                  disabled={loading}
                  onPress={() => handleResetForm(resetForm)}
                  variant="text"
                >
                  {$t('clear')}
                </Button>
              </FormGroup>
            </Container>
          </KeyboardAwareScrollView>
          <FixedContainer>
            <Button disabled={loading} loading={loading} onPress={handleSubmit}>
              {$t('search')}
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
  loading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  models: PropTypes.array.isRequired,
  modelsLoading: PropTypes.bool.isRequired,
  onChangeBrand: PropTypes.func.isRequired,
  onChangeModel: PropTypes.func.isRequired,
  onChangeProductType: PropTypes.func.isRequired,
  onResetForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  prices: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  productsLoading: PropTypes.bool.isRequired,
  states: PropTypes.array.isRequired,
  statesLoading: PropTypes.bool.isRequired,
  years: PropTypes.array.isRequired,
  yearsLoading: PropTypes.bool.isRequired,
  countriesLoading: PropTypes.bool.isRequired,
  getBrandsByProductId: PropTypes.func.isRequired,
  product_id: PropTypes.object.isRequired,
};

export default Form;
