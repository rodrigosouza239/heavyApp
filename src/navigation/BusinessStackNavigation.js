import BuyersScreen from '@containers/business/BuyersScreen';
import BusinessScreen from '@containers/business/Screen';
import useTranslation from '@i18n/';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import useStackOptions from './config/useHeaderOptions';

const BusinessStack = createStackNavigator();

function BusinessStackNavigation({ navigation, route: { params } }) {
  const $t = useTranslation();
  const options = useStackOptions();

  React.useEffect(() => {
    if (params?.screen) {
      const { screen, options } = params;

      setTimeout(() => {
        navigation.navigate(screen, options);
        navigation.setParams({ screen: null, options: null });
      }, 50);
    }
  }, [params]);

  return (
    <BusinessStack.Navigator screenOptions={options}>
      <BusinessStack.Screen
        component={BusinessScreen}
        name="business-home"
        options={{ title: $t('negotiations') }}
      />
      <BusinessStack.Screen
        component={BuyersScreen}
        name="business-buyers"
        options={{ title: $t('buyers') }}
      />
    </BusinessStack.Navigator>
  );
}

export default BusinessStackNavigation;
