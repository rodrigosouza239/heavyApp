import Container from '@components/Container';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Progress from '../components/Progress';
import {
  fetchCountries,
  fetchProductTypes,
  getBrandsByProductId,
  getCitiesByStateId,
  getFabricationYearsByModelId,
  getModelsByBrandId,
  getPlatformsByModelId,
  getStatesByCountryId,
  updateInitialValues,
} from '../ducks';
import Form from './Form';

function Overview({ navigation }) {
  const dispatch = useDispatch();
  const $t = useTranslation();

  const {
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
    platforms,
    platformsLoading,
    productTypes,
    productTypesError,
    productTypesLoading,
    states,
    statesLoading,
    initialValues: { currentStep, totalSteps },
  } = useSelector((state) => state.ad);

  useEffect(() => {
    const params = { orderby: [['description', 'asc']] };

    dispatch(fetchProductTypes(params));
    dispatch(fetchCountries());
  }, []);

  const handleChangeProductType = (value, { item, setFieldValue }) => {
    if (item) {
      setFieldValue('has_platform', Boolean(item?.has_platform));
    }

    const params = {
      orderby: [['description', 'asc']],
      where: [['product_id', '=', value]],
    };

    dispatch(getBrandsByProductId(params));
  };

  const handleChangeBrand = (value) => {
    const params = {
      orderby: [['description', 'asc']],
      where: [['brand_id', '=', value]],
      includes: ['brand', 'brand.product'],
    };

    dispatch(getModelsByBrandId(params));
  };

  const handleChangeModel = (value, item, setFieldValue) => {
    const productHasPlatform = Boolean(item?.brand?.product?.has_platform);
    setFieldValue('has_platform', productHasPlatform);

    const fabricationYearsParams = {
      orderby: [['year', 'asc']],
      where: [['model_id', '=', value]],
    };

    dispatch(getFabricationYearsByModelId(fabricationYearsParams));

    const platformsParams = {
      includes: ['model'],
      orderby: [['description', 'asc']],
      where: [['model_id', '=', value]],
    };

    dispatch(getPlatformsByModelId(platformsParams));
  };

  const handleChangeCountry = (value) => {
    const params = {
      orderby: [['description', 'asc']],
      where: [['country_id', '=', value]],
    };

    dispatch(getStatesByCountryId(params));
  };

  const handleChangeState = (value) => {
    const params = {
      orderby: [['description', 'asc']],
      where: [['state_id', '=', value]],
    };

    dispatch(getCitiesByStateId(params));
  };

  const getProductTypeSettings = (product_id) => {
    const { has_mileage, has_motorhours, has_trackhours } = productTypes.find(({ id }) => {
      return id.toString() === product_id.toString();
    });

    return { has_mileage, has_motorhours, has_trackhours };
  };

  const getStepsCount = (product_id) => {
    const countRequiredSteps = 8;

    const productSettings = getProductTypeSettings(product_id);

    return countRequiredSteps + Object.keys(productSettings).filter((item) => !!item).length;
  };

  const handleSubmit = (values) => {
    const { product_id } = values;

    const productSettings = getProductTypeSettings(product_id);
    const stepsCount = getStepsCount(product_id);

    dispatch(
      updateInitialValues({
        ...values,
        ...productSettings,
        steps_count: stepsCount,
      }),
    );

    return navigation.navigate('home-description');
  };

  const progress = (
    <Container pb={0}>
      <Progress
        pageIndex={1}
        progress={currentStep / totalSteps}
        description={
          <Typography variant="body2" align="center" color="textSecondary">
            {$t('createAdTitles.please')}{' '}
            <Typography variant="body2" color="textSecondary" fontWeight="bold">
              {$t('createAdTitles.fillIn')}
            </Typography>{' '}
            {$t('createAdTitles.all')}
            {'\n'}
            {$t('createAdTitles.fieldsCorrectly')}
          </Typography>
        }
      />
    </Container>
  );

  return (
    <Form
      brands={brands}
      brandsLoading={brandsLoading}
      cities={cities}
      citiesLoading={citiesLoading}
      countries={countries}
      countriesLoading={countriesLoading}
      fabricationYears={fabricationYears}
      fabricationYearsLoading={fabricationYearsLoading}
      initialValues={initialValues}
      models={models}
      modelsLoading={modelsLoading}
      onChangeBrand={handleChangeBrand}
      onChangeCountry={handleChangeCountry}
      onChangeModel={handleChangeModel}
      onChangeProductType={handleChangeProductType}
      onChangeState={handleChangeState}
      onSubmit={handleSubmit}
      platforms={platforms}
      platformsLoading={platformsLoading}
      productTypes={productTypes}
      productTypesError={productTypesError}
      productTypesLoading={productTypesLoading}
      progress={progress}
      states={states}
      statesLoading={statesLoading}
    />
  );
}

Overview.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Overview;
