import DescriptionScreen from '@containers/ad/Description/Screen';
import EngineHoursScreen from '@containers/ad/EngineHours/Screen';
import ExtrasScreen from '@containers/ad/Extras/Screen';
import KilometersScreen from '@containers/ad/Kilometers/Screen';
import OptionalsScreen from '@containers/ad/Optionals/Screen';
import OverviewScreen from '@containers/ad/Overview/Screen';
import PaymentScreen from '@containers/ad/Payment/Screen';
import PaymentTermsScreen from '@containers/ad/Payment/Terms/index';
import PhotosScreen from '@containers/ad/Photos/Screen';
import PlanScreen from '@containers/ad/Plan/Screen';
import PriceScreen from '@containers/ad/Price/Screen';
import TrailHoursScreen from '@containers/ad/TrailHours/Screen';
import ContactScreen from '@containers/home/contact/Screen';
import HomeScreen from '@containers/home/Screen';
import ChangePassword from '@containers/password/Screen';
import ProfileIndexScreen from '@containers/profile';
import ProfileScreen from '@containers/profile/Screen';
import CompleteRegisterScreen from '@containers/auth/tabs/CompleteRegister';
import useTranslation from '@i18n/';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import useStackOptions from './config/useHeaderOptions';

const HomeStack = createStackNavigator();

function HomeStackNavigation() {
  const $t = useTranslation();
  const options = useStackOptions();

  return (
    <HomeStack.Navigator initialRouteName="home-initial" screenOptions={options}>
      <HomeStack.Screen
        name="home-initial"
        options={{ headerShown: false, title: $t('home') }}
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="home-profile"
        options={{ title: $t('profile') }}
        component={ProfileIndexScreen}
      />
      <HomeStack.Screen
        name="home-profile-data"
        options={{ title: $t('profileData.title') }}
        component={ProfileScreen}
      />
      <HomeStack.Screen
        name="home-profile-password"
        options={{ title: $t('profilePassword.title') }}
        component={ChangePassword}
      />
      <HomeStack.Screen
        name="home-overview"
        component={OverviewScreen}
        options={{ title: $t('advertisement') }}
      />
      <HomeStack.Screen
        name="home-missing-profile"
        component={CompleteRegisterScreen}
        options={{ title: $t('completeRegister') }}
      />
      <HomeStack.Screen
        name="home-description"
        component={DescriptionScreen}
        options={{ title: $t('description') }}
      />
      <HomeStack.Screen
        name="home-optionals"
        component={OptionalsScreen}
        options={{ title: $t('options') }}
      />
      <HomeStack.Screen
        name="home-extras"
        component={ExtrasScreen}
        options={{ title: $t('extras') }}
      />
      <HomeStack.Screen
        name="home-kilometers"
        component={KilometersScreen}
        options={{ title: $t('mileage') }}
      />
      <HomeStack.Screen
        name="home-engine-hours"
        component={EngineHoursScreen}
        options={{ title: $t('engineHours') }}
      />
      <HomeStack.Screen
        name="home-trail-hours"
        component={TrailHoursScreen}
        options={{ title: $t('trackHours') }}
      />
      <HomeStack.Screen
        name="home-price"
        component={PriceScreen}
        options={{ title: $t('price') }}
      />
      <HomeStack.Screen
        name="home-photos"
        component={PhotosScreen}
        options={{ title: $t('photos') }}
      />
      <HomeStack.Screen name="home-plans" component={PlanScreen} options={{ title: $t('plans') }} />
      <HomeStack.Screen
        name="home-payment"
        component={PaymentScreen}
        options={{ title: $t('payment') }}
      />
      <HomeStack.Screen
        name="home-payment-terms"
        component={PaymentTermsScreen}
        options={{ title: $t('payment') }}
      />
      <HomeStack.Screen
        component={ContactScreen}
        name="home-contact"
        options={{ title: $t('contact') }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigation;
