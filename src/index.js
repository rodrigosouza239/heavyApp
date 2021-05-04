/* eslint-disable global-require */
import Splash from '@containers/splash/Screen';
import Root from '@navigation/';
import Checker from '@navigation/Checker';
import { containerRef } from '@navigation/config/root';
import useLinking from '@navigation/config/useLinking';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { persistor, store } from '@store/configureStore';
import { ThemeProvider } from '@theme';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import * as React from 'react';
import * as Notifications from 'expo-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SocketProvider from '@components/SocketProvider';
import OrientationProvider from '@components/OrientationProvider';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isSplashScreenComplete, setSplashScreenComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const { getInitialState } = useLinking(containerRef);

  const [fontLoaded] = Font.useFonts({
    'avenir-regular': require('@assets/fonts/text/Avenir-Roman-12.ttf'),
    'avenir-medium': require('@assets/fonts/text/Avenir-Medium-09.ttf'),
    'avenir-bold': require('@assets/fonts/text/Avenir-Black-03.ttf'),
    icomoon: require('@assets/fonts/icons/icomoon.ttf'),
  });

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());
      } catch (e) {
        // no feeback
      } finally {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, [isSplashScreenComplete]);

  const handleFinishSplashScreen = () => {
    setSplashScreenComplete(true);
  };

  const navigationTheme = {
    dark: false,
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  if (isLoadingComplete && fontLoaded) {
    if (isSplashScreenComplete) {
      return (
        <StoreProvider store={store}>
          <SocketProvider>
            <OrientationProvider>
              <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider>
                  <SafeAreaProvider>
                    <Checker navigationInitialState={initialNavigationState}>
                      <NavigationContainer
                        theme={navigationTheme}
                        ref={containerRef}
                        initialState={initialNavigationState}
                      >
                        <Root />
                      </NavigationContainer>
                    </Checker>
                  </SafeAreaProvider>
                </ThemeProvider>
              </PersistGate>
            </OrientationProvider>
          </SocketProvider>
        </StoreProvider>
      );
    }

    return <Splash onFinish={handleFinishSplashScreen} />;
  }

  return null;
}
