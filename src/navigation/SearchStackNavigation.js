import LocationScreen from '@containers/search/Filter/components/Location';
import PriceScreen from '@containers/search/Filter/components/Price';
import ProductDetailsScreen from '@containers/search/ProductDetails/Screen';
import ResultsScreen from '@containers/search/Results/Screen';
import SearchScreen from '@containers/search/Screen';
import ChatScreen from '@containers/search/Chat/Screen';
import CompareScreen from '@containers/search/Compare/Screen';
import OrderScreen from '@containers/search/Order/Screen';
import useTranslation from '@i18n/';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import useStackOptions from './config/useHeaderOptions';

const SearchStack = createStackNavigator();

function SearchStackNavigation() {
  const $t = useTranslation();
  const options = useStackOptions();

  return (
    <SearchStack.Navigator initialRouteName="search-home" screenOptions={options}>
      <SearchStack.Screen
        name="search-home"
        options={{ title: $t('search') }}
        component={SearchScreen}
      />
      <SearchStack.Screen
        component={LocationScreen}
        name="search-location"
        options={{ title: $t('location') }}
      />
      <SearchStack.Screen
        name="search-price"
        options={{ title: $t('prices') }}
        component={PriceScreen}
      />
      <SearchStack.Screen
        component={ResultsScreen}
        name="search-results"
        options={{ title: $t('result') }}
      />
      <SearchStack.Screen
        component={ProductDetailsScreen}
        name="search-product-details"
        options={{ title: $t('product') }}
      />
      <SearchStack.Screen
        component={ChatScreen}
        name="search-product-chat"
        options={{ title: $t('adDetails') }}
      />
      <SearchStack.Screen
        component={CompareScreen}
        name="search-product-comparation"
        options={{ title: $t('comparation') }}
      />
      <SearchStack.Screen
        component={OrderScreen}
        name="search-order"
        options={{ title: $t('orderResultsBy') }}
      />
    </SearchStack.Navigator>
  );
}

export default SearchStackNavigation;
