import React, { memo, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import * as PropTypes from 'prop-types';
import { useIsFocused } from '@react-navigation/native';

function XCarousel({ width, image, imageStyles }) {
  const isFocused = useIsFocused();
  const carRef = useRef();

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        carRef.current?.snapToNext();
      }, 800);
    }
  }, [isFocused]);

  return (
    <Carousel
      ref={carRef}
      initialNumToRender={3}
      windowSize={3}
      shouldOptimizeUpdates
      removeClippedSubviews
      sliderWidth={width}
      itemWidth={width}
      scrollEnabled={false}
      autoplay
      autoplayInterval={5000}
      hasParallaxImages
      loop
      data={image}
      renderItem={({ item }, parallaxProps) => {
        return (
          <ParallaxImage
            parallaxFactor={0.4}
            containerStyle={{
              flex: 1,
              marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
              backgroundColor: 'white',
              borderRadius: 8,
            }}
            style={imageStyles}
            resizeMode="cover"
            source={item}
            {...parallaxProps}
          />
        );
      }}
    />
  );
}

XCarousel.propTypes = {
  width: PropTypes.number.isRequired,
  image: PropTypes.array.isRequired,
  imageStyles: PropTypes.object.isRequired,
};

export default memo(XCarousel);
