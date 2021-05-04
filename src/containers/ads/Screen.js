import Tab from '@components/Tab';
import useTranslation from '@i18n/';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import Active from './tabs/active/Screen';
import Inactive from './tabs/inactive/Screen';

const { width: viewportWidth } = Dimensions.get('window');

const initialLayout = { width: viewportWidth };

function Ads() {
  const $t = useTranslation();
  const [index, setIndex] = useState(0);
  const { language } = useSelector((state) => state.localization);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    setRoutes([
      { key: 'active', title: $t('active') },
      { key: 'inactive', title: $t('inactive') },
    ]);
  }, [language]);

  const renderScene = SceneMap({
    active: Active,
    inactive: Inactive,
  });

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
