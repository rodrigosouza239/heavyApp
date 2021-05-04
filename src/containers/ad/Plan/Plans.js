import Container from '@components/Container';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Loading from './Loading';
import Plan from './Plan';

const { width: viewportWidth } = Dimensions.get('window');

const carouselItemWidth = viewportWidth / 1.2;

function Form({ plans, plansLoading, progress, onSelectPlan }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const carousel = useRef(null);

  const {
    palette: {
      common: { black },
    },
  } = useTheme();

  const renderItem = (plan) => {
    const { item } = plan;

    return plansLoading ? <Loading /> : <Plan onPress={onSelectPlan} data={item} />;
  };

  const fakePlans = Array.from(Array(3).keys());

  return (
    <>
      <ScrollView scrollEventThrottle={200} directionalLockEnabled>
        {progress}
        <Container pt={0}>
          <Carousel
            activeSlideAlignment="start"
            data={plansLoading ? fakePlans : plans}
            itemWidth={carouselItemWidth}
            onSnapToItem={(index) => setActiveSlide(index)}
            ref={carousel}
            removeClippedSubviews={false}
            renderItem={renderItem}
            sliderWidth={viewportWidth}
          />
          <Pagination
            activeDotIndex={activeSlide}
            carouselRef={carousel}
            containerStyle={{ paddingVertical: 0, width: carouselItemWidth }}
            dotsLength={plansLoading ? fakePlans.length : plans?.length}
            dotStyle={{ backgroundColor: black }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.8}
            tappableDots={!!carousel}
          />
        </Container>
      </ScrollView>
    </>
  );
}

Form.propTypes = {
  onSelectPlan: PropTypes.func.isRequired,
  plans: PropTypes.array.isRequired,
  plansLoading: PropTypes.bool.isRequired,
  progress: PropTypes.element.isRequired,
};

export default Form;
