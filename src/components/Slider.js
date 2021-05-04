import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React from 'react';
import { Slider as NativeSlider, StyleSheet, View } from 'react-native';
import Typography from './Typography';

const styles = StyleSheet.create({
  labels: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function Slider({ onChange, minLabel, maxLabel, step, minimumValue, maximumValue }) {
  const {
    palette: {
      primary: { main },
    },
  } = useTheme();

  return (
    <>
      <View style={styles.labels}>
        <Typography variant="caption">{minLabel}</Typography>
        <Typography variant="caption">{maxLabel}</Typography>
      </View>
      <NativeSlider
        maximumValue={maximumValue}
        minimumTrackTintColor={main}
        minimumValue={minimumValue}
        onValueChange={onChange}
        step={step}
        thumbTintColor={main}
      />
    </>
  );
}

Slider.defaultProps = {
  maximumValue: 1000000,
  maxLabel: 0,
  minimumValue: 0,
  minLabel: 0,
  onChange: null,
  step: 10000,
};

Slider.propTypes = {
  maximumValue: PropTypes.number,
  maxLabel: PropTypes.string,
  minimumValue: PropTypes.number,
  minLabel: PropTypes.string,
  onChange: PropTypes.func,
  step: PropTypes.number,
};

export default Slider;
