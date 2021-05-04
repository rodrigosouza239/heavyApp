import Loading from '@components/Loading';
import { useVehicleStatus } from '@utils/';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOptionalsByProductId, saveAd } from '../../ducks';
import Form from './Form';

function Optionals({ navigation, route }) {
  const { initialValues } = route.params;
  const dispatch = useDispatch();
  const vehicleStatus = useVehicleStatus();

  const { vehicleSavingSuccess, vehicleSavingLoading, optionals, optionalsLoading } = useSelector(
    (state) => state.ads,
  );

  const handleSubmit = (values) => {
    const vehicle_optional = values?.optionals?.map((optional_id) => ({ optional_id })) || [];
    dispatch(
      saveAd({ ...values, vehicle_optional, status: vehicleStatus['review-edited'].status }),
    );
  };

  useEffect(() => {
    const getOptionals = () => {
      const { product_id } = initialValues;

      const params = {
        orderby: [['description', 'asc']],
        where: [['product_id', '=', product_id]],
      };

      dispatch(getOptionalsByProductId(params));
    };

    getOptionals();
  }, []);

  useEffect(() => {
    if (vehicleSavingSuccess) {
      navigation.navigate('ads-edit', { success: true });
    }
  }, [vehicleSavingSuccess]);

  return (
    <>
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        optionals={optionals}
        optionalsLoading={optionalsLoading}
        vehicleSavingLoading={vehicleSavingLoading}
      />
      <Loading loading={vehicleSavingLoading} />
    </>
  );
}

Optionals.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      initialValues: PropTypes.shape({
        id: PropTypes.number,
        optionals: PropTypes.array,
        product_id: PropTypes.number,
      }),
    }),
  }).isRequired,
};

export default Optionals;
