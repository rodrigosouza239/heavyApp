import ActivityIndicator from '@components/ActivityIndicator';
import Button from '@components/Button';
import FixedContainer, { useFixedContainerHeight } from '@components/Button/FixedContainer';
import Container from '@components/Container';
import useIsUserAuthenticated from '@containers/auth/hooks/useIsUserAuthenticated';
import { logout } from '@containers/auth/ducks';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useTranslation from '@i18n/';
import { useSelector, useDispatch } from 'react-redux';
import MessageModal from '@components/MessageModal';
import Product from '../../../components/Product';

function ProductDetail({ data, loading, ad }) {
  const $t = useTranslation();
  const navigation = useNavigation();
  const { user: userData } = useSelector((state) => state.auth);
  const isUserAuthenticated = useIsUserAuthenticated();
  const fixedContainerHeight = useFixedContainerHeight();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [userVehicle, setUserVehicle] = useState('');

  const setAndLogout = async () => {
    await AsyncStorage.setItem(`heavymotors:selectedAd`, JSON.stringify(ad?.id));
    dispatch(logout());
  };

  if (loading) {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    );
  }

  return (
    <>
      <MessageModal
        setShowModal={setShowModal}
        showModal={showModal}
        userPhone={userPhone}
        userVehicle={userVehicle}
        productDetails
      />
      <ScrollView>
        <Container px={0} style={{ paddingBottom: fixedContainerHeight }}>
          <Product complete data={data} />
        </Container>
      </ScrollView>
      <FixedContainer>
        {ad?.user?.email !== userData?.email && (
          <Button
            onPress={() => {
              if (isUserAuthenticated) {
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
                    if (!userData?.[split?.[0]]?.[split?.[1]]) {
                      return true;
                    }
                  } else if (!userData?.[id]) {
                    return true;
                  }
                  return false;
                });

                if (filt.length) {
                  return navigation.navigate('home-missing-profile', {
                    needed: filt,
                    onComplete: () => {
                      if (data?.user?.userPhoneWhats) {
                        setUserPhone(data?.user?.phone);
                        setUserVehicle(data?.id);
                        setShowModal(true);
                      } else {
                        navigation.navigate('search-product-chat');
                      }
                    },
                  });
                }

                if (data?.user?.userPhoneWhats) {
                  setUserPhone(data?.user?.phone);
                  setUserVehicle(data?.id);
                  setShowModal(true);
                } else {
                  navigation.navigate('search-product-chat');
                }
              } else {
                setAndLogout();
              }
            }}
          >
            {$t('sendMessage')}
          </Button>
        )}
      </FixedContainer>
    </>
  );
}

ProductDetail.defaultProps = {
  data: null,
};

ProductDetail.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default ProductDetail;
