import Icon, { iconNames } from '@components/Icon';
import Typography from '@components/Typography';
import { useTheme } from '@theme/';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const MAXIMIZED_LABEL_FONT_SIZE = 16;
const MINIMIZED_LABEL_FONT_SIZE = 14;
const OUTLINE_MINIMIZED_LABEL_Y_OFFSET = -14;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
  },
  label: {
    left: 0,
    lineHeight: 20,
    position: 'absolute',
    top: 18,
  },
  iconHolder: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  endAdornment: {
    justifyContent: 'center',
    position: 'absolute',
  },
});

function TextInputAsButton({ endAdornment, icon, label, onPress, value, disabled }) {
  const [endAdornmentLayout, setEndAdornmentLayout] = useState({ measured: false, width: 0 });
  const [labelLayout, setLabelLayout] = useState({ measured: false, width: 0 });

  const {
    button: { activeOpacity },
    shape: { borderRadius },
    input: {
      borderColor,
      borderWidth,
      height,
      labelColor,
      paddingLeft,
      paddingLeftWithIcon,
      paddingRight,
    },
    palette: {
      action,
      text: { secondary },
    },
  } = useTheme();

  const { width, measured } = endAdornmentLayout;

  const textInputAsButtonStyles = {
    borderColor,
    borderRadius,
    borderWidth,
    height,
    lineHeight: 20,
    paddingBottom: 10,
    paddingLeft: icon ? paddingLeftWithIcon : paddingLeft,
    paddingRight: endAdornment && measured ? width + paddingRight : paddingRight,
    paddingTop: 26,
  };

  const handleLayoutEndAdornment = (event) => {
    setEndAdornmentLayout({
      width: event.nativeEvent.layout.width,
      measured: true,
    });
  };

  const handleLayoutLabel = (event) => {
    setLabelLayout({
      width: event.nativeEvent.layout.width,
      measured: true,
    });
  };

  const handlePress = () => {
    return !disabled && requestAnimationFrame(onPress);
  };

  const labelStyle = value
    ? {
        transform: [
          { translateY: OUTLINE_MINIMIZED_LABEL_Y_OFFSET },
          { scale: MINIMIZED_LABEL_FONT_SIZE / MAXIMIZED_LABEL_FONT_SIZE },
          {
            translateX:
              -(1 - MINIMIZED_LABEL_FONT_SIZE / MAXIMIZED_LABEL_FONT_SIZE) *
              (labelLayout.width / 2),
          },
        ],
      }
    : {};

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={activeOpacity}>
      <View style={[styles.root, textInputAsButtonStyles]}>
        {icon && (
          <View
            style={[
              styles.iconHolder,
              {
                left: 0,
                width: paddingLeftWithIcon,
              },
            ]}
          >
            <Icon disabled={disabled} name={icon} />
          </View>
        )}
        <Typography
          onLayout={handleLayoutLabel}
          style={[
            styles.label,
            labelStyle,
            {
              left: icon ? paddingLeftWithIcon : paddingLeft,
              color: disabled ? action.disabled : labelColor,
            },
          ]}
        >
          {label}
        </Typography>
        <Typography
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[styles.flex, { color: secondary }]}
          allowFontScaling={false}
        >
          {value}
        </Typography>
        {endAdornment ? (
          <View
            onLayout={handleLayoutEndAdornment}
            style={[
              styles.endAdornment,
              {
                height,
                right: paddingRight,
                zIndex: 10,
              },
            ]}
          >
            {endAdornment}
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

TextInputAsButton.defaultProps = {
  disabled: false,
  endAdornment: null,
  icon: null,
  label: null,
  onPress: null,
  value: '',
};

TextInputAsButton.propTypes = {
  disabled: PropTypes.bool,
  endAdornment: PropTypes.node,
  icon: PropTypes.oneOf(iconNames),
  label: PropTypes.string,
  onPress: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default TextInputAsButton;
