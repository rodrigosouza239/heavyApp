import ActivityIndicator from '@components/ActivityIndicator';
import Container from '@components/Container';
import { PUBLIC_USER } from '@constants/';
import { login } from '@containers/auth/ducks';
import useIsUserAuthenticated from '@containers/auth/hooks/useIsUserAuthenticated';
import { useUserCanSeeContent } from '@containers/auth/hooks/useUserCanSeeContent';
import { getUser } from '@containers/profile/ducks';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Checker({ children, navigationInitialState }) {
  const [isAppReady, setIsAppReady] = useState(false);
  const [fadeOpacity] = React.useState(new Animated.Value(0));
  const canSeeContent = useUserCanSeeContent();
  const isAuthenticated = useIsUserAuthenticated();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const animate = () => {
    Animated.timing(fadeOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    async function handleAuth() {
      if (navigationInitialState) {
        if (!canSeeContent) {
          await new Promise((resolve) => {
            dispatch(login({ values: PUBLIC_USER, resolve }));
          });
        }
      }

      if (isAuthenticated) {
        // const params = {
        //   includes: ['vehicle', 'user_info'],
        //   where: [['id', '=', user?.id]],
        //   in: [['status', ['active', 'suspended']]],
        // };
        // console.tron.log('EAE');
        // dispatch(getUser(params));
      }
      setIsAppReady(true);
    }

    handleAuth();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      animate();
    }
  }, [isAppReady]);

  if (isAppReady) {
    return <Animated.View style={{ flex: 1, opacity: fadeOpacity }}>{children}</Animated.View>;
  }

  return (
    <Container style={styles.root}>
      <ActivityIndicator />
    </Container>
  );
}

Checker.defaultProps = {
  navigationInitialState: undefined,
};

Checker.propTypes = {
  children: PropTypes.element.isRequired,
  navigationInitialState: PropTypes.object,
};

export default Checker;
