import { useTheme } from '@theme/';
import color from 'color';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Item from './Item';

const { width: viewportWidth } = Dimensions.get('window');

export function useCarouselSizes(enableContainer = true) {
  const {
    container: { spacingTimes },
    spacing,
  } = useTheme();

  const sliderHeight = 320;
  let sliderWidth = viewportWidth;

  if (enableContainer) {
    sliderWidth = viewportWidth - spacing(spacingTimes * 2);
  }

  return {
    sliderWidth,
    sliderHeight,
  };
}

function CarouselComponent({ data, enableContainer, handleOpenModal }) {
  const {
    spacing,
    palette: { primary },
    shape: { borderRadius },
  } = useTheme();

  const slider = useRef();
  const firstItem = 0;
  const [sliderActive, setSliderActive] = useState(firstItem);
  const { sliderWidth, sliderHeight } = useCarouselSizes(enableContainer);

  const renderItem = (carousel, parallaxProps) => {
    const { item } = carousel;
    return (
      <Item
        data={item}
        parallax
        parallaxProps={parallaxProps}
        sliderHeight={sliderHeight}
        sliderWidth={sliderWidth}
        onPress={handleOpenModal}
      />
    );
  };

  const dotStyle = {
    borderRadius,
    height: spacing(),
    marginHorizontal: spacing(),
    width: spacing(),
  };

  return (
    <View height={sliderHeight}>
      <Carousel
        data={data}
        firstItem={firstItem}
        hasParallaxImages
        itemWidth={sliderWidth}
        onSnapToItem={(index) => setSliderActive(index)}
        ref={slider}
        removeClippedSubviews={false}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        pointerEvents="box-none"
      />
      <Pagination
        activeDotIndex={sliderActive}
        carouselRef={slider}
        containerStyle={{ paddingTop: spacing(2), paddingBottom: 0 }}
        dotColor={primary.main}
        dotContainerStyle={{ paddingHorizontal: 0, marginHorizontal: 0 }}
        dotsLength={Array.isArray(data) ? data.length : 0}
        dotStyle={dotStyle}
        inactiveDotColor={color(primary.main).alpha(0.2).rgb().toString()}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
        tappableDots={!!slider}
      />
    </View>
  );
}

CarouselComponent.defaultProps = {
  data: [],
  enableContainer: true,
  handleOpenModal: () => {},
};

CarouselComponent.propTypes = {
  data: PropTypes.array,
  enableContainer: PropTypes.bool,
  handleOpenModal: PropTypes.func,
};

export default CarouselComponent;
