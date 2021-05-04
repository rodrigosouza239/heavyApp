import { useDispatch } from 'react-redux';
import * as Notifications from 'expo-notifications';
import PropTypes from 'prop-types';

import { navigate } from '@navigation/config/root';
import ForgotPasswordScreen from '@containers/auth/ForgotPassword/Screen';
import PrivacyScreen from '@containers/auth/Terms/Privacy';
import UseTermsScreen from '@containers/auth/Terms/Use';
import { useUserCanSeeContent } from '@containers/auth/hooks/useUserCanSeeContent';
import LoginScreen from '@containers/auth/Screen';
import useTranslation from '@i18n/';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@theme/';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext } from 'react';
import { SocketContext } from '@components/SocketProvider';
import ChatScreen from '@containers/business/ChatScreen';
import BottomTabNavigation from './BottomTabNavigation';
import useDefaultScreenOptions from './config/useDefaultScreenOptions';

const Stack = createStackNavigator();

function Auth({ route }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (route?.params?.screen) {
      const { screen, options } = route?.params;

      setTimeout(() => {
        navigate(screen, options);
      }, 50);
    }
  }, [route]);

  const { socketCon } = useContext(SocketContext);
  const $t = useTranslation();
  const canSeeContent = useUserCanSeeContent();
  const defaultScreenOptions = useDefaultScreenOptions();
  const {
    palette: {
      primary: { main },
      common: { white, black },
    },
  } = useTheme();

  useEffect(() => {
    if (global?.store?.getState()?.auth?.user?.token) socketCon();

    const askPermission = async () => {
      Notifications.addNotificationResponseReceivedListener(({ notification }) => {
        const {
          request: {
            content: { data: body },
          },
        } = notification;

        if (!body) {
          return;
        }

        if (body?.type === 'HM_CHAT_NOTIFICATION') {
          const { user } = body;
          const chatData = body?.vehicle_id
            ? { item: { vehicle_id: body?.vehicle_id } }
            : { user: { id: user?.id, email: user?.email, secure_id: user?.secure_id } };
          navigate('chat', chatData);
        }
      });
    };
    askPermission(dispatch);
  }, []);

  return (
    <>
      <StatusBar
        style={canSeeContent ? 'light' : 'dark'}
        backgroundColor={canSeeContent ? main : white}
      />
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        {canSeeContent ? (
          <>
            <Stack.Screen
              component={BottomTabNavigation}
              name={$t('back')}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              component={ChatScreen}
              name="chat"
              options={{
                title: $t('messages'),
                headerTintColor: white,
                headerStyle: {
                  backgroundColor: black,
                },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              component={LoginScreen}
              name="auth-login"
              options={{
                animationTypeForReplace: canSeeContent ? 'pop' : 'push',
                headerShown: false,
                title: $t('signIn'),
              }}
            />
            <Stack.Screen
              component={ForgotPasswordScreen}
              name="auth-forgot-password"
              options={{ title: $t('forgotPassword') }}
            />
            <Stack.Screen
              component={PrivacyScreen}
              name="privacy-terms"
              options={{
                title: $t('privacyTerms'),
                headerTintColor: white,
                headerStyle: {
                  backgroundColor: black,
                },
              }}
            />
            <Stack.Screen
              component={UseTermsScreen}
              name="use-terms"
              options={{
                title: $t('useTerms'),
                headerTintColor: white,
                headerStyle: {
                  backgroundColor: black,
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

Auth.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Auth;
