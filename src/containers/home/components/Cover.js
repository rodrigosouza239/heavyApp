import Logo from '@components/Svg/Logo';
import useIsUserAuthenticated from '@containers/auth/hooks/useIsUserAuthenticated';
import LogoutButton from '@containers/profile/components/LogoutButton';
import { useTheme } from '@theme/';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import Carousel from './Carousel';
import LanguageButton from './LanguageButton';
import ProfileButton from './ProfileButton';
import ProfileSettings from './ProfileSettings';

const { height: viewportHeight, width: viewportWidth } = Dimensions.get('window');

export function useCoverHeight() {
  return viewportHeight * 0.35;
}

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    zIndex: 1,
  },
  icon: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: 40 * 3,
    zIndex: 1,
  },
});

function Cover({ image, nameInitials, onPressProfile, onPressLanguage }) {
  const isUserAuthenticated = useIsUserAuthenticated();
  const insets = useSafeAreaInsets();
  const { language } = useSelector((state) => state.localization);

  const {
    container: { spacingTimes },
    shape: { borderRadius },
    palette: {
      primary,
      common: { white },
    },
    spacing,
  } = useTheme();

  const height = useCoverHeight();
  const topSpacing = insets.top + spacing(spacingTimes);
  const width = viewportWidth - spacing(spacingTimes * 2);

  const imageHolderStyles = {
    height,
    marginHorizontal: spacing(spacingTimes),
    overflow: 'hidden',
    position: 'relative',
    width,
  };

  const imageStyles = {
    borderRadius,
    height,
    width,
  };

  const linearGradientStyles = {
    height: height + topSpacing + spacing(spacingTimes),
    paddingTop: topSpacing,
  };

  const computedSpacing = spacing(spacingTimes);

  const logoStyles = {
    top: computedSpacing,
    left: computedSpacing,
  };

  const iconStyles = {
    right: computedSpacing,
    top: computedSpacing,
  };

  return (
    <LinearGradient
      colors={[primary.main, white]}
      end={[0, 1]}
      locations={[0, 0]}
      start={[0, 0.6]}
      style={linearGradientStyles}
    >
      <View style={imageHolderStyles}>
        <View style={[styles.logo, logoStyles]}>
          <Logo color="white" />
        </View>
        <View style={[styles.icon, iconStyles]}>
          <LanguageButton
            country={`${language}`.toLowerCase().includes('pt') ? 'br' : 'us'}
            onPress={onPressLanguage}
          />
          <ProfileSettings />
          {isUserAuthenticated ? (
            <ProfileButton initials={nameInitials} onPress={onPressProfile} />
          ) : (
            <LogoutButton iconSize={32} />
          )}
        </View>
        <Carousel width={width} image={image} imageStyles={imageStyles} />
      </View>
    </LinearGradient>
  );
}

Cover.defaultProps = {
  nameInitials: '',
};

Cover.propTypes = {
  image: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  nameInitials: PropTypes.string,
  onPressLanguage: PropTypes.func.isRequired,
  onPressProfile: PropTypes.func.isRequired,
};

export default Cover;
