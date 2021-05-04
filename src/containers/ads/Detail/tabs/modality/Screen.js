import ActivityIndicator from '@components/ActivityIndicator';
import Container from '@components/Container';
import { normalizeAdModality } from '@containers/ads/helper';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@components/Button';
import useTranslation from '@i18n/';
import Box from '@components/Box';
import { useTheme } from '@theme/';
import { getAdByVehicleId } from '../../../ducks';
import Product from './components/Product';

function Modality({ vehicleId, navigation }) {
  const { ad, adLoading } = useSelector((state) => state.ads);
  const dispatch = useDispatch();
  const $t = useTranslation();
  const {
    container: { spacingTimes },
  } = useTheme();

  useEffect(() => {
    dispatch(getAdByVehicleId(vehicleId));
  }, [vehicleId]);

  const normalizedAdModality = normalizeAdModality(ad);

  if (adLoading) {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    );
  }

  const renderButton = () => {
    if (ad?.current_payment) {
      if (
        ad?.current_payment?.status !== 'authorized' &&
        (ad?.status === 'payment-reproved' ||
          ad?.status === 'payment-canceled' ||
          ad?.status === 'expired' ||
          ad?.status === 'waiting-payment')
      ) {
        return (
          <Button onPress={() => navigation.navigate('home-plans', { ad })}>
            {$t('payAgain')}
          </Button>
        );
      }
      return <></>;
    }
    return (
      <Button onPress={() => navigation.navigate('home-plans', { ad })}>{$t('payAgain')}</Button>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container px={0}>
        <Product data={normalizedAdModality} />
        <Box p={spacingTimes}>{renderButton()}</Box>
      </Container>
    </ScrollView>
  );
}

Modality.propTypes = {
  vehicleId: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Modality;
