import Container from '@components/Container';
import ProgressBar from '@components/ProgressBar';
import Logo from '@components/Svg/Logo';
import Tab from '@components/Tab';
import Login from '@containers/auth/tabs/Login';
import Register from '@containers/auth/tabs/Register';
import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabView } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { useTheme } from '@theme/';
import useTranslation from '@i18n';
import Box from '@components/Box';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const initialLayout = { width: viewportWidth };

function Auth() {
  const $t = useTranslation();
  const { spacing } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'login', title: $t('signIn') },
    { key: 'register', title: $t('signUp') },
  ]);

  const renderScene = SceneMap({
    login: Login,
    register: Register,
  });

  const registerDone = useSelector((state) => state.auth.registerDone);
  const startRegister = 0.3;
  const doneRegister = 1;

  return (
    <SafeAreaView style={styles.flex}>
      <Container>
        <Logo />
        <Box mt={2} style={[styles.progress, { height: spacing() }]}>
          {Boolean(index) && <ProgressBar progress={registerDone ? doneRegister : startRegister} />}
        </Box>
      </Container>
      <TabView
        initialLayout={initialLayout}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={(props) => <Tab {...props} />}
      />
    </SafeAreaView>
  );
}

export default Auth;
