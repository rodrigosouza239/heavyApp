import Loading from '@components/Loading';
import { useVehicleStatus } from '@utils/';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Ducks from '../../ducks';
import Form from './Form';

function Extras({ navigation, route }) {
  const { initialValues } = route.params;
  const dispatch = useDispatch();
  const vehicleStatus = useVehicleStatus();

  const { vehicleSavingSuccess, vehicleSavingLoading, extras, extrasLoading } = useSelector(
    (state) => state.ads,
  );

  useEffect(() => {
    const fetchExtras = () => {
      const params = {
        orderby: [['description', 'asc']],
      };

      dispatch(Ducks.fetchExtras(params));
    };

    fetchExtras();
  }, []);

  useEffect(() => {
    if (vehicleSavingSuccess) {
      navigation.navigate('ads-edit', { success: true });
    }
  }, [vehicleSavingSuccess]);

  const handleSubmit = (values) => {
    const vehicle_extra = values?.extras?.map((extra_id) => ({ extra_id })) || [];
    dispatch(
      Ducks.saveAd({ ...values, vehicle_extra, status: vehicleStatus['review-edited'].status }),
    );
  };

  return (
    <>
      <Form
        extras={extras}
        extrasLoading={extrasLoading}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        vehicleSavingLoading={vehicleSavingLoading}
      />
      <Loading loading={vehicleSavingLoading} />
    </>
  );
}

Extras.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      initialValues: PropTypes.shape({
        id: PropTypes.number,
        extras: PropTypes.array,
        product_id: PropTypes.number,
      }),
    }),
  }).isRequired,
};

export default Extras;
