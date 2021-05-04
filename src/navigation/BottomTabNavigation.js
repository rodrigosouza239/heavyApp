/* eslint-disable react/prop-types */
import Icon from '@components/Icon';
import useIsUserAuthenticated from '@containers/auth/hooks/useIsUserAuthenticated';
import useTranslation from '@i18n/';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@theme';
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialNotifications, setUser, updateLastMessage } from '@containers/business/ducks';
import { SocketContext } from '@components/SocketProvider';

import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { getUser } from '@containers/profile/ducks';
import AdsStackNavigation from './AdsStackNavigation';
import BusinessStackNavigation from './BusinessStackNavigation';
import HomeStackNavigation from './HomeStackNavigation';
import SearchStackNavigation from './SearchStackNavigation';

const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  const dispatch = useDispatch();
  const { initialData } = useSelector((state) => state.business);
  const auth = useSelector((state) => state.auth);
  const { socket } = useContext(SocketContext);

  const [unread, setUnread] = useState([]);

  const $t = useTranslation();
  const mapIcons = {
    'tab-home': 'home',
    'tab-search': 'search',
    'tab-business': 'handshake',
    'tab-ads': 'tractor',
  };

  const { palette, spacing } = useTheme();

  const activeTintColor = palette.primary.main;
  const isUserAuthenticated = useIsUserAuthenticated();

  const unreadMessages = () => {
    const unreaded = [];
    // eslint-disable-next-line array-callback-return
    Object.keys(initialData)?.map((item) => {
      if (!initialData[item].read)
        if (initialData[item]?.user?.id !== auth?.user?.id)
          unreaded.push({ user: initialData[item].user, vehicle: initialData[item].vehicles });
        else unreaded.push({ user: initialData[item].to, vehicle: initialData[item].vehicles });
    });
    setUnread(unreaded);
    dispatch(setUser(unreaded));
  };

  const getNotificattions = (data) => {
    dispatch(updateLastMessage(data));
    dispatch(getInitialNotifications());
  };

  const socketCon = () => {
    const newChannelName = `notifications.${auth?.user?.secure_id}`;
    socket
      .private(newChannelName)
      .listen('.NotificationSendEvent', (data) => getNotificattions(data));
  };

  useEffect(() => {
    if (socket) socketCon();
  }, [socket]);

  useEffect(() => {
    dispatch(getInitialNotifications());

    const params = {
      includes: ['vehicle', 'user_info'],
      where: [['id', '=', auth?.user?.id]],
      in: [['status', ['active', 'suspended']]],
    };
    dispatch(getUser(params));
  }, []);

  useEffect(() => {
    if (initialData) {
      unreadMessages();
    }
  }, [initialData]);

  function MyTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: Platform.OS === 'ios' ? spacing(0.5) : null,
          paddingBottom: Platform.OS === 'ios' ? spacing(1.5) : null,
          marginBottom: 15,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={label}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{ flex: 1 }}
            >
              {isFocused && (
                <View
                  style={{
                    position: 'absolute',
                    width: '30%',
                    borderRadius: 100,
                    backgroundColor: 'black',
                    height: 5,
                    alignSelf: 'center',
                  }}
                />
              )}
              {index === 2 && unread.length > 0 && (
                <View
                  style={{ width: '30%', alignSelf: 'center', position: 'absolute', zIndex: 2 }}
                >
                  <Text
                    style={{
                      borderRadius: 100,
                      backgroundColor: palette.lightGreen.main,
                      width: 20,
                      textAlign: 'center',
                      alignSelf: 'flex-end',
                    }}
                  >
                    {unread.length}
                  </Text>
                </View>
              )}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: spacing(0.5),
                }}
              >
                <Icon color={activeTintColor} name={mapIcons[route.name]} />
                <Text numberOfLines={1} style={{ color: activeTintColor }}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName="tab-home"
        screenOptions={({ route }) => ({
          // eslint-disable-next-line
          tabBarIcon: ({ focused }) => {
            return <Icon color={activeTintColor} name={mapIcons[route.name]} />;
          },
        })}
        tabBar={(props) => <MyTabBar {...props} />}
        tabBarOptions={{
          activeTintColor,
          allowFontScaling: false,
        }}
      >
        <Tab.Screen
          name="tab-home"
          options={{ tabBarLabel: $t('home') }}
          component={HomeStackNavigation}
        />
        <Tab.Screen
          name="tab-search"
          options={{ tabBarLabel: $t('search') }}
          component={SearchStackNavigation}
        />
        {isUserAuthenticated && (
          <Tab.Screen
            name="tab-business"
            options={{ tabBarLabel: $t('negotiations') }}
            component={BusinessStackNavigation}
          />
        )}
        {isUserAuthenticated && (
          <Tab.Screen
            name="tab-ads"
            options={{ tabBarLabel: $t('adverts') }}
            component={AdsStackNavigation}
          />
        )}
      </Tab.Navigator>
    </>
  );
}

export default BottomTabNavigation;
