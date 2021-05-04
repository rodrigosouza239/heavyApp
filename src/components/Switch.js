import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Switch as NativeSwitch, View } from 'react-native';
import Box from './Box';
import Typography from './Typography';

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function Switch({ checked, label, labelProps, labelStyle, onValueChange, style }) {
  const {
    input: { labelColor },
    palette: {
      divider,
      common: { white },
      primary,
    },
  } = useTheme();

  const labelStyles = {};

  if (!labelProps?.color) {
    labelStyles.color = labelColor;
  }

  return (
    <View style={[styles.root, style]}>
      {label && (
        <Box mr={2}>
          <Typography style={[labelStyles, labelStyle]} {...labelProps}>
            {label}
          </Typography>
        </Box>
      )}
      <NativeSwitch
        ios_backgroundColor={divider}
        onValueChange={onValueChange}
        thumbColor={white}
        trackColor={{ false: divider, true: primary.main }}
        value={checked}
      />
    </View>
  );
}

Switch.defaultProps = {
  checked: false,
  label: null,
  labelProps: null,
  labelStyle: null,
  style: null,
};

Switch.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  labelProps: PropTypes.object,
  labelStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onValueChange: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Switch;
