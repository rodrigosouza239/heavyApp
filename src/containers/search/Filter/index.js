import useTranslation from '@i18n/';
import { useNavigation } from '@react-navigation/native';
import { normalizePrice } from '@utils/';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductTypes,
  getBrandsByProductId,
  getModelsByBrandId,
  getYearsByModelId,
  getCountries,
} from '../ducks';
import Form from './components/Form';

function Filter({ route }) {
  const $t = useTranslation();
  const initialPrice = { price_start: $t('priceZero'), price_end: $t('priceZero') };
  const [prices, setPrices] = useState(initialPrice);
  const [location, setLocation] = useState({ country_id: 1, state_id: '', city_id: '' });

  const [formValues, setFormValues] = useState({});

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { params } = route;

  const {
    brands,
    brandsLoading,
    cities,
    citiesLoading,
    models,
    modelsLoading,
    products,
    productsLoading,
    resultsLoading,
    states,
    statesLoading,
    years,
    yearsLoading,
    countries,
    countriesLoading,
    // filters,
  } = useSelector((state) => state.search);

  const { country } = useSelector((state) => state.localization);

  const handleSubmit = async (values) => {
    let { document_type } = values;

    document_type =
      Array.isArray(document_type) && (document_type.length === 0 || document_type.length === 2)
        ? ''
        : document_type.join();

    let { price_start, price_end } = prices;

    price_start = normalizePrice(price_start);
    price_end = normalizePrice(price_end);

    navigation.navigate('search-results', {
      filter: { ...values, ...location, document_type, price_start, price_end },
    });
  };

  useEffect(() => {
    dispatch(fetchProductTypes());
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    function setLocationValues() {
      if (params && params.location) {
        const { state_id, city_id } = params.location;
        setLocation({ ...location, state_id, city_id });
        setFormValues(params.formValues);
      }
    }

    setLocationValues();
  }, [route.params?.location]);

  useEffect(() => {
    if (countries?.length > 0) {
      const countryTo = countries?.find((e) => e.initials === country);
      setLocation({ ...location, country_id: countryTo?.id });
    }
  }, [country]);

  useEffect(() => {
    if (countries?.length > 0) {
      const countryTo = countries?.find((e) => e.initials === country);
      setLocation({ ...location, country_id: countryTo?.id });
    }
  }, [countries]);

  useEffect(() => {
    function setLocationValues() {
      if (params && params.prices) {
        const { price_start, price_end } = params.prices;
        setPrices({ price_start, price_end });
      }
    }

    setLocationValues();
  }, [route.params?.prices]);

  const handleChangeProductType = (value) => {
    dispatch(getBrandsByProductId(value));
  };

  const handleChangeBrand = (value) => {
    dispatch(getModelsByBrandId(value));
  };

  const handleChangeModel = (value) => {
    dispatch(getYearsByModelId(value));
  };

  const onResetForm = () => {
    setPrices(initialPrice);
    if (countries?.length > 0) {
      const countryTo = countries?.find((e) => e.initials === country);
      setLocation({
        country_id: countryTo?.id,
        state_id: '',
        city_id: '',
      });
    }
    // filters.product_id = '';
  };

  return (
    <Form
      brands={brands}
      brandsLoading={brandsLoading}
      cities={cities}
      citiesLoading={citiesLoading}
      error={false}
      loading={resultsLoading}
      location={location}
      models={models}
      modelsLoading={modelsLoading}
      onChangeBrand={handleChangeBrand}
      onChangeModel={handleChangeModel}
      onChangeProductType={handleChangeProductType}
      onResetForm={onResetForm}
      onSubmit={handleSubmit}
      prices={prices}
      products={products}
      productsLoading={productsLoading}
      states={states}
      statesLoading={statesLoading}
      years={years}
      yearsLoading={yearsLoading}
      countriesLoading={countriesLoading}
      getBrandsByProductId={getBrandsByProductId}
      getModelsByBrandId={getModelsByBrandId}
      getYearsByModelId={getYearsByModelId}
      product_id={params?.product_id || undefined}
      formValues={formValues}
    />
  );
}

Filter.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Filter;
