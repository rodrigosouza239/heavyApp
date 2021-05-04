import ErrorDialog from '@components/Dialog/ErrorDialog';
import Loading from '@components/Loading';
import { PUBLIC_USER } from '@constants/';
import { login, facebook, google, microsoft, apple } from '@containers/auth/ducks';
import useTranslation from '@i18n/';
import { useNavigation } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Haptics from 'expo-haptics';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Facebook from 'expo-facebook';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import * as Google from 'expo-google-app-auth';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Form from './components/Form';

function LoginScreen() {
  const faceId = '760369391186113';
  const googleIdAndroidExpo =
    '304789523096-7tf4rvp991mnd80tgke4tmpm1ms3cn9q.apps.googleusercontent.com';
  const googleIdAndroid =
    '304789523096-vnbjfe8hq6c268pmu5mrc0danbaj39h3.apps.googleusercontent.com';
  const googleIdIOSExpo =
    '304789523096-gt1o2vh30oem7esh2617o0ki3bj5uov7.apps.googleusercontent.com';
  const googleIdIOS = '304789523096-n1fo6re85hkp6jddmfomv1i18kuaeurn.apps.googleusercontent.com';
  const appName = 'Heavy Motors';

  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const [notifToken, setNotifToken] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const $t = useTranslation();

  const SCHEME = Constants.manifest.scheme;

  const discovery = useAutoDiscovery('https://login.microsoftonline.com/common/v2.0');
  const [, response, promptAsync] = useAuthRequest(
    {
      clientId: '156d28cb-5773-4e83-a27b-a51c9f37e880',
      usePKCE: false,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri: makeRedirectUri({
        native: `${SCHEME}://redirect`,
      }),
    },
    discovery,
  );

  useEffect(() => {
    const microsoftLogin = async (token, state) => {
      const values = {
        code: token,
        state,
        code_verifier: state,
        redirect_uri: makeRedirectUri({
          native: `${SCHEME}://redirect`,
        }),
        expo_token: notifToken,
      };

      await new Promise((resolve) => {
        dispatch(microsoft({ ...values, resolve }));
      });
    };
    if (response?.params?.code) {
      microsoftLogin(response?.params?.code, response?.params?.state);
    }
  }, [response]);

  const loginError = useSelector((state) => state.auth.loginError);
  const loginLoading = useSelector((state) => state.auth.loginLoading);

  const facebookLoading = useSelector((state) => state.auth.facebookLoading);
  const facebookError = useSelector((state) => state.auth.facebookError);

  const googleLoading = useSelector((state) => state.auth.googleLoading);
  const googleError = useSelector((state) => state.auth.googleError);

  const microsoftLoading = useSelector((state) => state.auth.microsoftLoading);
  const microsoftError = useSelector((state) => state.auth.microsoftError);

  const appleLoading = useSelector((state) => state.auth.appleLoading);
  const appleError = useSelector((state) => state.auth.appleError);

  const isLoading = loginLoading || facebookLoading || googleLoading || microsoftLoading;

  const handleSubmit = async (value, formikActions) => {
    const values = { ...value, expo_token: notifToken };
    const data = await new Promise((resolve) => {
      dispatch(login({ values, resolve }));
    });

    if (!data.success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      formikActions.setFieldError('password', $t('emailOrPasswordInvalid'));
    }
  };

  const toggleModalErrorVisible = () => setModalErrorVisible((visible) => !visible);

  const handleSkipLogin = () => dispatch(login({ values: PUBLIC_USER }));

  const onPressForgotPassword = () => navigation.navigate('auth-forgot-password');

  const askPermissions = async () => {
    try {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus === 'granted') {
        const data = await Notifications.getExpoPushTokenAsync();
        setNotifToken(data);
      } else {
        Alert.alert('Erro', 'Erro ao atualizar token.');
      }
    } catch (e) {
      Alert.alert('Erro', 'Erro ao atualizar token.');
    }
  };

  useEffect(() => {
    if (loginError || facebookError || googleError || microsoftError || appleError) {
      toggleModalErrorVisible();
    }
  }, [loginError, facebookError, googleError, microsoftError, appleError]);

  useEffect(() => {
    askPermissions();
  }, []);

  const faceLogin = async () => {
    try {
      await Facebook.initializeAsync(faceId, appName);

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const values = { access_token: token, expo_token: notifToken };
        await new Promise((resolve) => {
          dispatch(facebook({ ...values, resolve }));
        });
      }
    } catch ({ message }) {
      Alert.alert('Erro', 'Erro ao efetuar login via Facebook');
    }
  };

  const googleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: googleIdAndroidExpo,
        iosClientId: googleIdIOSExpo,
        iosStandaloneAppClientId: googleIdIOS,
        androidStandaloneAppClientId: googleIdAndroid,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const values = { access_token: result.accessToken, expo_token: notifToken };
        await new Promise((resolve) => {
          dispatch(google({ ...values, resolve }));
        });
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Erro', 'Erro ao efetuar login via Google');
    }
  };

  const microsoftLogin = async () => {
    try {
      await promptAsync();
    } catch (e) {
      console.log(e);
      Alert.alert('Erro', 'Erro ao efetuar login via Microsoft');
    }
  };

  const appleLogin = async () => {
    try {
      const {
        fullName: { familyName, givenName },
        identityToken,
      } = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const values = {
        access_token: identityToken,
        expo_token: notifToken,
        ...(givenName && { fullName: `${givenName} ${familyName}` }),
      };
      await new Promise((resolve) => {
        dispatch(apple({ ...values, resolve }));
      });
    } catch (e) {
      Alert.alert('Erro', 'Erro ao efetuar login via Apple');
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Form
        loading={loginLoading}
        onPressForgotPassword={onPressForgotPassword}
        onSkipLogin={handleSkipLogin}
        onSubmit={handleSubmit}
        facebookSubmit={faceLogin}
        googleSubmit={googleLogin}
        microsoftSubmit={microsoftLogin}
        appleSubmit={appleLogin}
        facebookLoading={facebookLoading}
        facebookError={facebookError}
        googleLoading={googleLoading}
        googleError={googleError}
        microsoftLoading={microsoftLoading}
        microsoftError={microsoftError}
        appleLoading={appleLoading}
        appleError={appleError}
      />
      <ErrorDialog isVisible={modalErrorVisible} onClose={toggleModalErrorVisible} />
      <Loading loading={isLoading} text={$t('wait')} />
    </KeyboardAwareScrollView>
  );
}

export default LoginScreen;
