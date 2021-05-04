import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import Logo from './components/LogoWhite';

const AnimatedLogo = Animated.createAnimatedComponent(Logo);

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  firstLogo: {
    position: 'absolute',
    zIndex: 20,
  },
  secondLogo: {
    position: 'absolute',
    zIndex: 10,
  },
});

function SplashScreen({ onFinish }) {
  const [backgroundAnim] = useState(new Animated.Value(0));
  const [fisrtLogoAnim] = useState(new Animated.Value(0));
  const [secondLogoAnim] = useState(new Animated.Value(0));

  const {
    palette: {
      common: { white, black },
    },
  } = useTheme();

  const animate = () => {
    const easing = Easing.in;

    Animated.sequence([
      Animated.delay(500),
      Animated.timing(fisrtLogoAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }),
      Animated.delay(1000),
      Animated.timing(backgroundAnim, {
        toValue: 1,
        duration: 200,
        easing,
        useNativeDriver: false,
      }),
      Animated.timing(secondLogoAnim, {
        toValue: 1,
        duration: 200,
        easing,
        useNativeDriver: false,
      }),
      Animated.delay(1000),
    ]).start(({ finished: done }) => {
      if (done) {
        Animated.timing(secondLogoAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.in,
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (finished && onFinish) {
            onFinish();
          }
        });
      }
    });
  };

  useEffect(() => {
    animate();
  }, []);

  const interpolateColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [black, white],
  });

  const animatedStyle = {
    backgroundColor: interpolateColor,
  };

  return (
    <Animated.View style={[styles.root, animatedStyle]}>
      <AnimatedLogo
        style={[
          styles.firstLogo,
          {
            opacity: secondLogoAnim,
          },
        ]}
        symbolColor={black}
        textColor={black}
      />
      <AnimatedLogo
        style={[
          styles.secondLogo,
          {
            opacity: fisrtLogoAnim,
          },
        ]}
      />
      <Logo showText={false} />
    </Animated.View>
  );
}

SplashScreen.defaultProps = {
  onFinish: null,
};

SplashScreen.propTypes = {
  onFinish: PropTypes.func,
};

export default SplashScreen;
