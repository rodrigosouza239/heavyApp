import Loading from '@components/Loading';
import { normalizePrice, useVehicleStatus } from '@utils/';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveAd } from '../../ducks';
import Form from './Form';

function MoreInfos({ navigation, route }) {
  const { initialValues } = route.params;
  const dispatch = useDispatch();
  const { vehicleSavingSuccess, vehicleSavingLoading } = useSelector((state) => state.ads);
  const vehicleStatus = useVehicleStatus();

  useEffect(() => {
    if (vehicleSavingSuccess) {
      navigation.navigate('ads-edit', { success: true });
    }
  }, [vehicleSavingSuccess]);

  const handleSubmit = (values) => {
    dispatch(
      saveAd({
        ...values,
        price: normalizePrice(values.price),
        status: vehicleStatus['review-edited'].status,
      }),
    );
  };

  return (
    <>
      <Form
        vehicleSavingLoading={vehicleSavingLoading}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
      <Loading loading={vehicleSavingLoading} />
    </>
  );
}

MoreInfos.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      initialValues: PropTypes.shape({
        description: PropTypes.string,
        mileage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        motorhours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        trackhours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    }),
  }).isRequired,
};

export default MoreInfos;
