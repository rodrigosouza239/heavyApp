import Tab from '@components/Tab';
import useTranslation from '@i18n/';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import Sales from './tabs/Sales';
import Shopping from './tabs/Shopping';

const { width: viewportWidth } = Dimensions.get('window');

const initialLayout = { width: viewportWidth };

function Ads() {
  const $t = useTranslation();
  const [index, setIndex] = useState(0);
  const { language } = useSelector((state) => state.localization);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    setRoutes([
      { key: 'shopping', title: $t('shopping') },
      { key: 'sales', title: $t('sales') },
    ]);
  }, [language]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'shopping':
        return <Shopping />;
      case 'sales':
        return <Sales />;
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

export default Ads;
