import Icon, { iconNames } from '@components/Icon';
import { withTheme } from '@theme';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated, Platform, StyleSheet, Text, TextInput as CustomInput, View } from 'react-native';

const AnimatedText = Animated.createAnimatedComponent(Text);

const BLUR_ANIMATION_DURATION = 180;
const FOCUS_ANIMATION_DURATION = 150;
const MAXIMIZED_LABEL_FONT_SIZE = 16;
const MINIMIZED_LABEL_FONT_SIZE = 14;
const OUTLINE_MINIMIZED_LABEL_Y_OFFSET = -14;

const styles = StyleSheet.create({
  label: {
    left: 0,
    lineHeight: 20,
    position: 'absolute',
    top: 18,
  },
  input: {
    flexGrow: 1,
    fontSize: MAXIMIZED_LABEL_FONT_SIZE,
    textAlign: 'left',
  },
  icon: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
});

class TextInput extends Component {
  constructor(props) {
    super(props);

    const { value } = props;

    this.timer = null;

    this.state = {
      focused: false,
      labeled: new Animated.Value(value ? 0 : 1),
      placeholder: '',
      value,
      labelLayout: {
        measured: false,
        width: 0,
      },
      endAdornmentLayout: {
        measured: false,
        width: 0,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      value: typeof nextProps.value !== 'undefined' ? nextProps.value : prevState.value,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { focused, value } = this.state;
    const { error, label } = this.props;

    if (prevState.focused !== focused || prevState.value !== value || prevProps.error !== error) {
      // The label should be minimized if the text input is focused, or has text
      // In minimized mode, the label moves up and becomes small
      if (value || focused) {
        this.minmizeLabel();
      } else {
        this.restoreLabel();
      }
    }

    if (prevState.focused !== focused || prevProps.label !== label || prevProps.error !== error) {
      // Show placeholder text only if the input is focused, or has error, or there's no label
      // We don't show placeholder if there's a label because the label acts as placeholder
      // When focused, the label moves up, so we can show a placeholder
      if (focused || !label) {
        this.showPlaceholder();
      } else {
        this.hidePlaceholder();
      }
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
  }

  setNativeProps(...args) {
    return this.root && this.root.setNativeProps(...args);
  }

  showPlaceholder = () => {
    window.clearTimeout(this.timer);

    // Set the placeholder in a delay to offset the label animation
    // If we show it immediately, they'll overlap and look ugly
    this.timer = window.setTimeout(() => {
      const { placeholder } = this.props;

      this.setState({
        placeholder,
      });
    }, 50);
  };

  hidePlaceholder = () =>
    this.setState({
      placeholder: '',
    });

  restoreLabel = () => {
    const { labeled } = this.state;

    Animated.timing(labeled, {
      duration: FOCUS_ANIMATION_DURATION,
      toValue: 1,
      useNativeDriver: Platform.select({ ios: false, android: true }),
    }).start();
  };

  minmizeLabel = () => {
    const { labeled } = this.state;

    Animated.timing(labeled, {
      duration: BLUR_ANIMATION_DURATION,
      toValue: 0,
      useNativeDriver: Platform.select({ ios: false, android: true }),
    }).start();
  };

  handleFocus = (...args) => {
    const { disabled, onFocus } = this.props;

    if (disabled) {
      return;
    }

    this.setState({ focused: true });

    if (onFocus) {
      onFocus(...args);
    }
  };

  handleBlur = (...args) => {
    const { disabled, onBlur } = this.props;

    if (disabled) {
      return;
    }

    this.setState({ focused: false });

    if (onBlur) {
      onBlur(...args);
    }
  };

  handleChangeText = (value) => {
    const { editable, onChangeText } = this.props;

    if (!editable) {
      return;
    }

    this.setState({ value });

    if (onChangeText) {
      onChangeText(value);
    }
  };

  renderIcon = () => {
    const {
      icon,
      theme: { input },
      disabled,
    } = this.props;

    return (
      <View
        style={[
          {
            width: input.paddingLeftWithIcon,
          },
          styles.icon,
          { height: input.height },
        ]}
      >
        <Icon disabled={disabled} name={icon} />
      </View>
    );
  };

  handleLayoutEndAdornment = (event) => {
    this.setState({
      endAdornmentLayout: {
        width: event.nativeEvent.layout.width,
        measured: true,
      },
    });
  };

  handleLayoutLabel = (event) => {
    this.setState({
      labelLayout: {
        width: event.nativeEvent.layout.width,
        measured: true,
      },
    });
  };

  isFocused() {
    return this.root && this.root.isFocused();
  }

  clear() {
    return this.root && this.root.clear();
  }

  focus() {
    return this.root && this.root.focus();
  }

  blur() {
    return this.root && this.root.blur();
  }

  render() {
    const {
      disabled: isDisabled,
      endAdornment,
      error,
      icon,
      label,
      loading,
      multiline,
      placeholder,
      render,
      secureTextEntry,
      style,
      theme,
      ...rest
    } = this.props;

    const disabled = isDisabled || loading;

    const {
      palette: {
        action,
        common: { white },
        error: errorColor,
        text: { secondary: textSecondaryColor },
      },
      input,
      shape,
    } = theme;

    const {
      focused,
      labeled,
      labelLayout,
      placeholder: placeholderState,
      value,
      endAdornmentLayout,
    } = this.state;

    const hasActiveOutline = focused || error;
    const { backgroundColor = white } = StyleSheet.flatten(style) || {};

    const activeColor = error ? errorColor.main : input.borderColor;
    const outlineColor = input.borderColor;
    let inputTextColor = textSecondaryColor;

    const { labelColor } = input;
    const placeholderColor = action.disabled;

    if (disabled) {
      inputTextColor = placeholderColor;
    }

    const computedLabelColor = disabled ? action.disabled : labelColor;

    const leftSpace = icon ? input.paddingLeftWithIcon : input.paddingLeft;
    const { fontFamily } = theme.typography.fonts.regular;

    const labelStyle = {
      fontFamily,
      fontSize: MAXIMIZED_LABEL_FONT_SIZE,
      left: leftSpace,
      transform: [
        {
          // Move label to top
          translateY: labeled.interpolate({
            inputRange: [0, 1],
            outputRange: [OUTLINE_MINIMIZED_LABEL_Y_OFFSET, 0],
          }),
        },
        {
          // Make label smaller
          scale: labeled.interpolate({
            inputRange: [0, 1],
            outputRange: [MINIMIZED_LABEL_FONT_SIZE / MAXIMIZED_LABEL_FONT_SIZE, 1],
          }),
        },
        {
          // Offset label scale since RN doesn't support transform origin
          translateX: labeled.interpolate({
            inputRange: [0, 1],
            outputRange: [
              -(1 - MINIMIZED_LABEL_FONT_SIZE / MAXIMIZED_LABEL_FONT_SIZE) *
                (labelLayout.width / 2),
              0,
            ],
          }),
        },
      ],
    };

    const inputHeight = multiline ? { minHeight: input.height * 2 } : { height: input.height };

    // Hide the label in minimized state until we measure it's width
    let opacity = 1;
    if (value || focused) {
      opacity = labelLayout.measured || !label ? 1 : 0;
    }

    const inputStyles = label
      ? {
          lineHeight: 20,
          paddingBottom: 10,
          paddingTop: 26,
        }
      : null;

    return (
      <View
        style={[
          {
            backgroundColor,
            borderColor: hasActiveOutline ? activeColor : outlineColor,
            borderRadius: shape.borderRadius,
            borderWidth: input.borderWidth,
          },
          style,
        ]}
      >
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              opacity,
            },
          ]}
        >
          {icon && this.renderIcon()}
          {label && (
            <>
              <AnimatedText
                allowFontScaling={false}
                onLayout={this.handleLayoutLabel}
                style={[
                  styles.label,
                  labelStyle,
                  {
                    color: computedLabelColor,
                    opacity: labeled.interpolate({
                      inputRange: [0, 1],
                      outputRange: [hasActiveOutline ? 1 : 0, 0],
                    }),
                  },
                ]}
                numberOfLines={1}
              >
                {label}
              </AnimatedText>
              <AnimatedText
                allowFontScaling={false}
                style={[
                  styles.label,
                  labelStyle,
                  {
                    color: computedLabelColor,
                    opacity: hasActiveOutline ? labeled : 1,
                  },
                ]}
                numberOfLines={1}
              >
                {label}
              </AnimatedText>
            </>
          )}
        </View>
        {render({
          ...rest,
          ref: (el) => {
            this.root = el;
          },
          editable: !disabled,
          multiline,
          onBlur: this.handleBlur,
          onChangeText: this.handleChangeText,
          onFocus: this.handleFocus,
          placeholder: label ? placeholderState : placeholder,
          placeholderTextColor: placeholderColor,
          secureTextEntry: Boolean(secureTextEntry),
          selectionColor: activeColor,
          underlineColorAndroid: 'transparent',
          value: `${value}`,
          allowFontScaling: false,
          style: [
            styles.input,
            {
              ...inputStyles,
              ...inputHeight,
              color: inputTextColor,
              fontFamily,
              paddingLeft: leftSpace,
              paddingRight: endAdornment
                ? endAdornmentLayout.width + input.paddingRight
                : input.paddingRight,
              textAlignVertical: multiline ? 'top' : 'center',
            },
          ],
        })}
        {endAdornment ? (
          <View
            onLayout={this.handleLayoutEndAdornment}
            style={{
              ...inputHeight,
              justifyContent: 'center',
              position: 'absolute',
              right: input.paddingRight,
              zIndex: 10,
            }}
          >
            {endAdornment}
          </View>
        ) : null}
      </View>
    );
  }
}

TextInput.defaultProps = {
  disabled: false,
  editable: true,
  endAdornment: null,
  error: false,
  icon: null,
  label: null,
  loading: false,
  multiline: false,
  onBlur: null,
  onChangeText: null,
  onFocus: null,
  placeholder: null,
  render: (props) => <CustomInput {...props} />,
  secureTextEntry: null,
  style: null,
  value: '',
};

TextInput.propTypes = {
  disabled: PropTypes.bool,
  editable: PropTypes.bool,
  endAdornment: PropTypes.node,
  error: PropTypes.bool,
  icon: PropTypes.oneOf(iconNames),
  label: PropTypes.string,
  loading: PropTypes.bool,
  multiline: PropTypes.bool,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  render: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  theme: PropTypes.object.isRequired,
  value: PropTypes.node,
};

export default withTheme(TextInput);
