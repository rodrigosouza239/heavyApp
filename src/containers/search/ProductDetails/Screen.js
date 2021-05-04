import Box from '@components/Box';
import Container from '@components/Container';
import Tab from '@components/Tab';
import Typography from '@components/Typography';
import useTranslation from '@i18n/';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { getAdByVehicleId } from '../ducks';
import { normalizeAdDetail } from '../helper';
import Product from './tabs/Product';
import Seller from './tabs/Seller';

const { width: viewportWidth } = Dimensions.get('window');

const initialLayout = { width: viewportWidth };

function ProductDetails({ route }) {
  const $t = useTranslation();
  const { ad, adLoading } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'product', title: $t('product') },
    { key: 'seller', title: $t('seller') },
  ]);

  useEffect(() => {
    const {
      params: { vehicle_id },
    } = route;

    dispatch(getAdByVehicleId(vehicle_id));
  }, [route?.params?.vehicle_id]);

  useEffect(() => {
    const clearSelectAd = async () => {
      await AsyncStorage.removeItem(`heavymotors:selectedAd`);
    };
    clearSelectAd();
  }, []);

  const renderScene = ({ route: routeScene }) => {
    const singleImage = false;
    const product = normalizeAdDetail(ad, singleImage);

    if (routeScene.key === 'product') {
      return <Product data={product} loading={adLoading} ad={ad} />;
    }

    return <Seller data={product.user} loading={adLoading} />;
  };

  if (!adLoading && !ad) {
    return (
      <Container>
        <Typography align="center" color="textSecondary">
          {$t('vehicleNotFound')}
        </Typography>
      </Container>
    );
  }

  return (
    <Box mt={2} style={{ flex: 1 }}>
      <TabView
        initialLayout={initialLayout}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={(props) => <Tab {...props} />}
      />
    </Box>
  );
}

ProductDetails.propTypes = {
  route: PropTypes.object.isRequired,
};

export default ProductDetails;
