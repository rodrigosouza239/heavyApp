import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel';

const entryBorderRadius = 4;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    borderRadius: entryBorderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: entryBorderRadius,
  },
});

function Item({ data, parallaxProps, onPress, sliderHeight, sliderWidth }) {
  const {
    palette: { primary },
  } = useTheme();

  const slideInnerContainer = {
    height: sliderHeight,
    width: sliderWidth,
  };

  const renderImage = () => {
    return (
      <ParallaxImage
        containerStyle={styles.imageContainer}
        parallaxFactor={0.35}
        showSpinner
        source={{ uri: data }}
        spinnerColor={primary.main}
        style={styles.image}
        {...parallaxProps}
      />
    );
  };

  return (
    <TouchableOpacity activeOpacity={1} style={slideInnerContainer} onPress={onPress}>
      <View style={[styles.imageContainer]}>{renderImage()}</View>
    </TouchableOpacity>
  );
}

Item.defaultProps = {
  onPress: null,
  parallaxProps: null,
};

Item.propTypes = {
  data: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  parallaxProps: PropTypes.object,
  sliderHeight: PropTypes.number.isRequired,
  sliderWidth: PropTypes.number.isRequired,
};

export default Item;
