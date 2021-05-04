import useIsUserAuthenticated from '@containers/auth/hooks/useIsUserAuthenticated';
import { useScrollToTop } from '@react-navigation/native';
import { getNameInitials, getBannerImages } from '@utils/';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import useUserIsPublic from '@containers/auth/hooks/useUserIsPublic';
import { logout } from '@containers/auth/ducks';
import Categories from './components/Categories';
import Cover from './components/Cover';
import ModalLanguage from './components/ModalLanguage';
import SellOrBuy from './components/SellOrBuy';
import { fetchProductTypes } from './ducks';

function HomeScreen({ navigation, route }) {
  const [isModalLanguageVisible, setModalLanguageVisible] = useState(false);
  const [isStatusBarVisible, setIsStatusBarVisible] = useState(true);
  const scroll = React.useRef(null);

  useScrollToTop(scroll);

  const { products, productsLoading } = useSelector((state) => state.home);
  const auth = useSelector((state) => state.auth);

  const isUserAuthenticated = useIsUserAuthenticated();
  const isUserPublic = useUserIsPublic();

  const dispatch = useDispatch();

  const doLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const getAd = async () => {
      const ad = await AsyncStorage.getItem(`heavymotors:selectedAd`);
      if (isUserAuthenticated && ad && ad !== null) {
        navigation.navigate('tab-search', {
          screen: 'search-product-details',
          initial: false,
          params: { vehicle_id: ad },
        });
      }
    };
    const getPublicSell = async () => {
      const publicScreen = await AsyncStorage.getItem('heavymotors:public-screen');
      if (publicScreen === 'home-overview') {
        await AsyncStorage.removeItem('heavymotors:public-screen');
        const { user } = auth;
        const required_fields = [
          {
            id: 'email',
          },
          {
            id: 'name',
          },
          {
            id: 'user_info.country_id',
          },
          {
            id: 'user_info.genre',
          },
          {
            id: 'user_info.birth_date',
          },
          {
            id: 'user_info.document_number',
          },
          {
            id: 'user_info.document_type',
          },
          {
            id: 'user_info.phone',
          },
          {
            id: 'user_info.postal_code',
          },
        ];

        const filt = Object.values(required_fields).filter(({ id }) => {
          if (id.includes('.')) {
            const split = id.split('.');
            if (!user?.[split?.[0]]?.[split?.[1]]) {
              return true;
            }
          } else if (!user?.[id]) {
            return true;
          }
          return false;
        });

        if (filt.length) {
          return navigation.navigate('home-missing-profile', {
            needed: filt,
            onComplete: () => {
              return navigation.navigate('home-overview');
            },
          });
        }
        return navigation.navigate('home-overview');
      }
      return null;
    };
    getPublicSell();
    getAd();
    dispatch(fetchProductTypes());
  }, []);

  useEffect(() => {
    if (route.params?.vehicleId) {
      const { vehicleId } = route.params;

      navigation.navigate('tab-ads', {
        screen: 'ads-detail',
        initial: false,
        params: { vehicleId },
      });
    }
  }, [route.params?.vehicleId]);

  const handlePressSell = async () => {
    if (isUserAuthenticated) {
      const { user } = auth;
      const required_fields = [
        {
          id: 'email',
        },
        {
          id: 'name',
        },
        {
          id: 'user_info.country_id',
        },
        {
          id: 'user_info.genre',
        },
        {
          id: 'user_info.birth_date',
        },
        {
          id: 'user_info.document_number',
        },
        {
          id: 'user_info.document_type',
        },
        {
          id: 'user_info.phone',
        },
        {
          id: 'user_info.postal_code',
        },
      ];

      const filt = Object.values(required_fields).filter(({ id }) => {
        if (id.includes('.')) {
          const split = id.split('.');
          if (!user?.[split?.[0]]?.[split?.[1]]) {
            return true;
          }
        } else if (!user?.[id]) {
          return true;
        }
        return false;
      });

      if (filt.length) {
        return navigation.navigate('home-missing-profile', {
          needed: filt,
          onComplete: () => {
            return navigation.navigate('home-overview');
          },
        });
      }
      return navigation.navigate('home-overview');
    }
    if (isUserPublic) {
      await AsyncStorage.setItem('heavymotors:public-screen', 'home-overview');
      doLogout();
    }
    return null;
    // return dispatch(logout());
  };

  const handlePressBuy = () => {
    return navigation.navigate('tab-search');
  };

  const handlePressProfile = () => {
    return navigation.navigate('home-profile');
  };

  const handlePressLanguage = () => {
    setModalLanguageVisible((prevState) => !prevState);
  };

  const nameInitials = getNameInitials(auth?.user?.name);
  const bannerImages = useMemo(() => getBannerImages, []);

  const handleScroll = ({ nativeEvent }) => {
    const {
      contentOffset: { y },
    } = nativeEvent;

    if (y > 25) {
      setIsStatusBarVisible(false);
    } else {
      setIsStatusBarVisible(true);
    }
  };

  return (
    <>
      <ScrollView
        onMomentumScrollEnd={handleScroll}
        showsVerticalScrollIndicator={false}
        ref={scroll}
      >
        {/* eslint-disable-next-line */}
        <StatusBar style="light" hidden={!isStatusBarVisible} animated />
        <Cover
          image={bannerImages}
          nameInitials={nameInitials}
          onPressProfile={handlePressProfile}
          onPressLanguage={handlePressLanguage}
        />
        <SellOrBuy onPressBuy={handlePressBuy} onPressSell={handlePressSell} />
        <Categories loading={productsLoading} products={products} />
      </ScrollView>
      <ModalLanguage onClose={handlePressLanguage} isVisible={isModalLanguageVisible} />
    </>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
};

export default HomeScreen;
