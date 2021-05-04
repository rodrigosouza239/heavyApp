import Loading from '@components/Loading';
import { useVehicleStatus } from '@utils/';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCountries,
  fetchProductTypes,
  getBrandsByProductId,
  getCitiesByStateId,
  getFabricationYearsByModelId,
  getModelsByBrandId,
  getPlatformsByModelId,
  getStatesByCountryId,
  saveAd,
} from '../../ducks';
import Form from './Form';

function Overview({ navigation, route }) {
  const dispatch = useDispatch();
  const { initialValues } = route.params;
  const vehicleStatus = useVehicleStatus();

  const {
    brands,
    brandsLoading,
    cities,
    citiesLoading,
    countries,
    countriesLoading,
    fabricationYears,
    fabricationYearsLoading,
    models,
    modelsLoading,
    platforms,
    platformsLoading,
    productTypes,
    productTypesError,
    productTypesLoading,
    states,
    statesLoading,
    vehicleSavingLoading,
    vehicleSavingSuccess,
  } = useSelector((state) => state.ads);

  const handleChangeProductType = (value, { item, setFieldValue } = {}) => {
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

  const handleChangeModel = (value) => {
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

  useEffect(() => {
    const params = { orderby: [['description', 'asc']] };

    dispatch(fetchProductTypes(params));
    handleChangeProductType(initialValues?.product_id);
    handleChangeBrand(initialValues?.brand_id);
    handleChangeModel(initialValues?.model_id);
    handleChangeCountry(initialValues?.country_id);
    handleChangeState(initialValues?.state_id);
    dispatch(fetchCountries());
  }, []);

  useEffect(() => {
    if (vehicleSavingSuccess) {
      navigation.navigate('ads-edit', { success: true });
    }
  }, [vehicleSavingSuccess]);

  const getProductTypeSettings = (product_id) => {
    const { has_mileage, has_motorhours, has_trackhours } = productTypes.find(({ id }) => {
      return id.toString() === product_id.toString();
    });

    return { has_mileage, has_motorhours, has_trackhours };
  };

  const handleSubmit = (values) => {
    const { product_id } = values;

    const productSettings = getProductTypeSettings(product_id);

    dispatch(
      saveAd({
        ...values,
        ...productSettings,
        status: vehicleStatus['review-edited'].status,
      }),
    );
  };

  return (
    <>
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
        states={states}
        statesLoading={statesLoading}
        vehicleSavingLoading={vehicleSavingLoading}
      />
      <Loading loading={vehicleSavingLoading} />
    </>
  );
}

Overview.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      initialValues: PropTypes.shape({
        brand_id: PropTypes.number,
        city_id: PropTypes.number,
        country_id: PropTypes.number,
        fabrication_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        has_platform: PropTypes.bool,
        id: PropTypes.number,
        model_id: PropTypes.number,
        platform_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        product_id: PropTypes.number,
        state_id: PropTypes.number,
      }),
    }),
  }).isRequired,
};

export default Overview;
