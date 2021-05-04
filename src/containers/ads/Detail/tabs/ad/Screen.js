import ActivityIndicator from '@components/ActivityIndicator';
import Box from '@components/Box';
import Button from '@components/Button';
import Container from '@components/Container';
import { normalizeAdDetail } from '@containers/ads/helper';
import useTranslation from '@i18n/';
import { useNavigation } from '@react-navigation/native';
import { useVehicleStatus } from '@utils/';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getAdByVehicleId } from '../../../ducks';
import Product from './components/Product';

function Ad({ vehicleId }) {
  const { ad, adLoading } = useSelector((state) => state.ads);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const vehicleStatus = useVehicleStatus();
  const $t = useTranslation();

  useEffect(() => {
    dispatch(getAdByVehicleId(vehicleId));
  }, [vehicleId]);

  const normalizedAdDetail = normalizeAdDetail(ad);

  if (adLoading) {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    );
  }

  const handlePressPayAgain = () => {
    navigation.navigate('home-payment', { ad });
  };

  const handleEditAd = () => {
    navigation.navigate('ads-edit', { vehicleId });
  };

  const handleReactivate = () => {
    navigation.navigate('ads-reactivate', { vehicleId });
  };

  const renderFooter = () => {
    const mapStatus = {
      [vehicleStatus['payment-reproved'].status]: {
        text: $t('payAgain'),
        onPress: handlePressPayAgain,
      },
      [vehicleStatus['payment-canceled'].status]: {
        text: $t('payAgain'),
        onPress: handlePressPayAgain,
      },
      [vehicleStatus?.expired?.status]: {
        text: $t('payAgain'),
        onPress: handlePressPayAgain,
      },
      [vehicleStatus['review-reproved'].status]: {
        text: $t('redoAd'),
        onPress: handleEditAd,
      },
      [vehicleStatus['suspended-admin'].status]: {
        text: $t('reactivate'),
        onPress: handleReactivate,
      },
    };

    return Object.keys(mapStatus).includes(normalizedAdDetail?.status) ? (
      <Box mt={2}>
        <Button onPress={mapStatus[normalizedAdDetail?.status].onPress}>
          {mapStatus[normalizedAdDetail?.status].text}
        </Button>
      </Box>
    ) : null;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container px={0}>
        <Product renderFooter={renderFooter} data={normalizedAdDetail} />
      </Container>
    </ScrollView>
  );
}

Ad.propTypes = {
  vehicleId: PropTypes.number.isRequired,
};

export default Ad;
