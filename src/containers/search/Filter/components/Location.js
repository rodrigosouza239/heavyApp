import Button from '@components/Button';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import FormGroup from '@components/FormGroup';
import Icon from '@components/Icon';
import SelectModal from '@components/Select/SelectModal';
import { fetchStates, getCitiesByStateId } from '@containers/search/ducks';
import useTranslation from '@i18n/';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

function Location({ route }) {
  const [initialValues, setInitialValues] = useState({ country_id: 1, state_id: '', city_id: '' });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const $t = useTranslation();

  useEffect(() => {
    const { location } = route.params;

    function setLocation() {
      setInitialValues(location);
    }

    setLocation();
    const params = {
      orderby: [['description', 'asc']],
      where: [['country_id', '=', location?.country_id]],
    };
    dispatch(fetchStates(params));
  }, []);

  const { states, statesLoading, cities, citiesLoading } = useSelector((state) => state.search);

  const handleSubmitForm = (values) => {
    navigation.navigate('search-home', { location: values });
  };

  const handleChangeState = (value) => {
    dispatch(getCitiesByStateId(value));
  };

  const fixedContainerHeight = useFixedContainerHeight();

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmitForm}>
      {({ handleSubmit, values, setFieldValue }) => (
        <>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
            <Container style={{ paddingBottom: fixedContainerHeight }}>
              <FormGroup>
                <SelectModal
                  disabled={statesLoading}
                  endAdornment={<Icon disabled={statesLoading} name="plus" />}
                  label={$t('state')}
                  labelKey="description"
                  options={states}
                  value={values.state_id}
                  valueKey="id"
                  onChange={(value) => {
                    setFieldValue('state_id', value);
                    handleChangeState(value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <SelectModal
                  disabled={citiesLoading}
                  endAdornment={<Icon disabled={citiesLoading} name="plus" />}
                  label={$t('city')}
                  labelKey="description"
                  options={cities}
                  value={values.city_id}
                  valueKey="id"
                  onChange={(value) => {
                    setFieldValue('city_id', value);
                  }}
                />
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

Location.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Location;
