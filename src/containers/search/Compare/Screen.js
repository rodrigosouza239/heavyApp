import Box from '@components/Box';
import MessageModal from '@components/MessageModal';
import Container from '@components/Container';
import Typography from '@components/Typography';
import React, { useState } from 'react';
import { FlatList, Image, ScrollView } from 'react-native';
import useTranslation from '@i18n/';
import _ from 'lodash';
import { logout } from '@containers/auth/ducks';
import Button from '@components/Button';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import useIsUserAuthenticated from '@containers/auth/hooks/useIsUserAuthenticated';

function Compare({ route }) {
  const $t = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user: userData } = useSelector((state) => state.auth);
  const isUserAuthenticated = useIsUserAuthenticated();

  const [showModal, setShowModal] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [userVehicle, setUserVehicle] = useState('');

  const setAndLogout = async (adId) => {
    await AsyncStorage.setItem(`heavymotors:selectedAd`, JSON.stringify(adId));
    dispatch(logout());
  };

  const renderEmptyComponent = () => (
    <Container>
      <Typography align="center">{$t('noItemsToDisplay')}</Typography>
    </Container>
  );

  const renderItems = (title, value, innerValue, extra) => {
    const renderExtra = (item, ex) => {
      if (!ex) {
        return '';
      }
      const split = ex?.split('.');
      if (split?.length) {
        return `, ${_.get(item, ex)}` || '';
      }
      return `, ${item?.[ex]}` || '';
    };

    return (
      <Box style={{ borderBottomWidth: 1 }}>
        <Box mt={3} mb={2}>
          <Typography>{$t(title)}</Typography>
        </Box>
        <FlatList
          data={route?.params?.selected}
          keyExtractor={(item) => {
            if (innerValue) {
              if (extra) {
                return String(`${item?.[value]?.[innerValue]} ${item?.id} ${extra}`);
              }
              return String(`${item?.[value]?.[innerValue]} ${item?.id}`);
            }
            return String(item?.[value] + item?.id);
          }}
          horizontal
          renderEmptyComponent={renderEmptyComponent}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <Box m={1} />}
          renderItem={({ item }) => {
            return (
              <Box mb={2} style={{ width: 200 }}>
                {innerValue ? (
                  <Typography>{`${item?.[value]?.[innerValue]} ${renderExtra(
                    item,
                    extra,
                  )}`}</Typography>
                ) : (
                  <Typography>{item?.[value]}</Typography>
                )}
              </Box>
            );
          }}
        />
      </Box>
    );
  };

  return (
    <>
      <MessageModal
        setShowModal={setShowModal}
        showModal={showModal}
        userPhone={userPhone}
        userVehicle={userVehicle}
      />
      <Container>
        <ScrollView horizontal>
          <ScrollView>
            <Box>
              <FlatList
                data={route?.params?.selected}
                keyExtractor={({ id }) => String(id)}
                horizontal
                renderEmptyComponent={renderEmptyComponent}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <Box m={1} />}
                renderItem={({ item }) => {
                  return (
                    <Box style={{ width: 200 }}>
                      <Image source={item?.images} style={{ height: 100 }} resizeMode="cover" />
                      <Box mt={2}>
                        <Typography
                          variant="subtitle"
                          color="textSecondary"
                          numberOfLines={1}
                          adjustsFontSizeToFit
                        >
                          {item?.brand}
                        </Typography>
                      </Box>
                      <Box mt={1} Box mb={2}>
                        <Typography
                          color="orange"
                          variant="subtitle"
                          numberOfLines={1}
                          adjustsFontSizeToFit
                        >
                          {item?.model}
                        </Typography>
                      </Box>
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
                                  if (item?.user?.userPhoneWhats) {
                                    setUserPhone(item?.user?.phone);
                                    setUserVehicle(item?.id);
                                    setShowModal(true);
                                  } else {
                                    navigation.navigate('search-product-chat');
                                  }
                                },
                              });
                            }

                            if (item?.user?.userPhoneWhats) {
                              setUserPhone(item?.user?.phone);
                              setUserVehicle(item?.id);
                              setShowModal(true);
                            } else {
                              navigation.navigate('chat', {
                                item: { vehicle_id: item?.id, firstMessage: true },
                              });
                            }
                          } else {
                            setAndLogout(item?.id);
                          }
                          return null;
                        }}
                        vectorIcon={<Ionicons name="ios-chatbubbles" size={24} color="white" />}
                        arrow={false}
                      >
                        {$t('messages')}
                      </Button>
                    </Box>
                  );
                }}
              />
              {renderItems('price', 'price')}
              {renderItems('year', 'fabricationYear')}
              {renderItems('location', 'city', 'description', 'city.state.initials')}
              {renderItems('engineHours', 'motorHours')}
              {renderItems('trackHours', 'trackHours')}
              {renderItems('advertiser', 'user', 'name')}
            </Box>
          </ScrollView>
        </ScrollView>
      </Container>
    </>
  );
}

MessageModal.propTypes = {
  route: null,
};

Compare.defaultProps = {
  route: { params: { selected: [] } },
};

Compare.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      selected: PropTypes.array,
    }),
  }),
};

export default Compare;
