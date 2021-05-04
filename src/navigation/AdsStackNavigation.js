import DetailScreen from '@containers/ads/Detail/Screen';
import ExtrasScreen from '@containers/ads/Edit/Extras/Screen';
import MoreInfosScreen from '@containers/ads/Edit/MoreInfos/Screen';
import OptionalsScreen from '@containers/ads/Edit/Optionals/Screen';
import OverviewScreen from '@containers/ads/Edit/Overview/Screen';
import PhotosScreen from '@containers/ads/Edit/Photos/Screen';
import EditScreen from '@containers/ads/Edit/Screen';
import ReactivateScreen from '@containers/ads/Reactivate/Screen';
import AdsScreen from '@containers/ads/Screen';
import useTranslation from '@i18n/';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import useStackOptions from './config/useHeaderOptions';

const AdsStack = createStackNavigator();

function AdsStackNavigation() {
  const options = useStackOptions();
  const $t = useTranslation();

  return (
    <AdsStack.Navigator screenOptions={options}>
      <AdsStack.Screen component={AdsScreen} name="ads-home" options={{ title: $t('adverts') }} />
      <AdsStack.Screen
        component={DetailScreen}
        name="ads-detail"
        options={{ title: $t('adDetails') }}
      />
      <AdsStack.Screen
        component={ReactivateScreen}
        name="ads-reactivate"
        options={{ title: $t('reactivate') }}
      />
      <AdsStack.Screen component={EditScreen} name="ads-edit" options={{ title: $t('editAd') }} />
      <AdsStack.Screen
        component={OverviewScreen}
        name="ads-overview"
        options={{ title: $t('adInformation') }}
      />
      <AdsStack.Screen
        component={MoreInfosScreen}
        name="ads-more-infos"
        options={{ title: $t('adInformation') }}
      />
      <AdsStack.Screen
        component={OptionalsScreen}
        name="ads-optionals"
        options={{ title: $t('options') }}
      />
      <AdsStack.Screen
        component={ExtrasScreen}
        name="ads-extras"
        options={{ title: $t('extras') }}
      />
      <AdsStack.Screen
        component={PhotosScreen}
        name="ads-photos"
        options={{ title: $t('photos') }}
      />
    </AdsStack.Navigator>
  );
}

export default AdsStackNavigation;
