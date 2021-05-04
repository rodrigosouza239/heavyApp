import Tab from '@components/Tab';
import useTranslation from '@i18n/';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import Ad from './tabs/ad/Screen';
import Modality from './tabs/modality/Screen';

const { width: viewportWidth } = Dimensions.get('window');

const initialLayout = { width: viewportWidth };

function Detail({ route, navigation }) {
  const { vehicleId } = route.params;
  const $t = useTranslation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'ad', title: $t('advertisement') },
    { key: 'modality', title: $t('modality') },
  ]);

  const renderScene = (scene) => {
    const {
      route: { key },
    } = scene;

    switch (key) {
      case 'ad':
        return <Ad vehicleId={vehicleId} />;
      case 'modality':
        return <Modality vehicleId={vehicleId} navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <TabView
      initialLayout={initialLayout}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderTabBar={(props) => <Tab {...props} />}
    />
  );
}

Detail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      vehicleId: PropTypes.number,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Detail;
