import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { withTheme } from '@theme/';

const {
  block,
  Clock,
  clockRunning,
  concat,
  cond,
  set,
  startClock,
  stopClock,
  timing,
  Value,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: value,
    time: new Value(0),
  };

  const config = {
    duration: 200,
    easing: Easing.inOut(Easing.ease),
    toValue: dest,
  };

  return block([
    cond(clockRunning(clock), 0, [
      // If the clock isn't running we reset all the animation params and start the clock
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),

    // we run the step here that is going to update position
    timing(clock, state, config),

    // if the animation is over we stop the clock
    cond(state.finished, stopClock(clock)),

    // we made the block return the updated position
    state.position,
  ]);
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.clock = new Clock();

    this.progress = new Value(0);

    this.animation = new Value(this.getComputedProgress(props.progress));

    this.transX = runTiming(this.clock, this.progress, this.animation);
  }

  componentDidUpdate() {
    const { progress } = this.props;
    this.animation.setValue(this.getComputedProgress(Math.max(Math.min(progress, 1), 0)));
  }

  getComputedProgress = (progress) => progress * 100;

  render() {
    const {
      theme: {
        palette: { divider, primary },
      },
    } = this.props;

    const { backgroundColor, borderRadius, color, height, style } = this.props;

    const progressStyle = {
      backgroundColor: color || primary.main,
      borderRadius,
      height,
      width: concat(this.transX, '%'),
      position: 'absolute',
      zIndex: 10,
    };

    return (
      <View
        style={[
          styles.root,
          {
            height: height * 2,
          },
          style,
        ]}
      >
        <View
          style={[
            {
              backgroundColor: backgroundColor || divider,
              borderRadius: borderRadius / 2,
              height: height / 2,
              left: 0,
              position: 'absolute',
              right: 0,
              zIndex: 5,
            },
          ]}
        />
        <Animated.View style={progressStyle} />
      </View>
    );
  }
}

ProgressBar.defaultProps = {
  backgroundColor: null,
  borderRadius: 2,
  color: null,
  height: 4,
  progress: 0,
  style: null,
};

ProgressBar.propTypes = {
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.number,
  progress: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  theme: PropTypes.object.isRequired,
};

export default withTheme(ProgressBar);
