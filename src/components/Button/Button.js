import Box from '@components/Box';
import Icon, { iconNames } from '@components/Icon';
import Typography from '@components/Typography';
import { useTheme } from '@theme';
import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import useTranslation from '@i18n/';

const styles = StyleSheet.create({
  labelRoot: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});

function Button({
  arrow,
  children,
  color,
  customColor,
  disabled,
  leftIcon,
  loading,
  size,
  variant,
  iconColor,
  vectorIcon,
  textColor,
  ...rest
}) {
  const theme = useTheme();
  const $t = useTranslation();

  const {
    icon: { size: iconSize },
    palette,
    shape: { borderRadius },
    spacing,
    button: buttonTheme,
    typography: {
      button,
      fonts: { regular },
    },
    palette: { common },
  } = theme;

  const { height, paddingHorizontal } = buttonTheme[size];

  const {
    primary,
    secondary,
    action: { disabled: disabledColor, disabledText },
  } = palette;

  const isDisabled = disabled || loading;

  const variants = {
    contained: {
      activeOpacity: 0.8,
      primary: {
        shapeStyles: {
          backgroundColor: isDisabled ? disabledColor : primary.main,
        },
        textStyles: {
          color: isDisabled ? disabledText : primary.constrastText,
          ...button,
        },
      },
      secondary: {
        shapeStyles: {
          backgroundColor: isDisabled ? disabledColor : secondary.main,
        },
        textStyles: {
          color: isDisabled ? disabledText : secondary.constrastText,
          ...button,
        },
      },
    },
    text: {
      activeOpacity: 0.5,
      primary: {
        shapeStyles: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        textStyles: {
          color: isDisabled ? disabledText : primary.main,
          ...button,
          ...regular,
        },
      },
      secondary: {
        shapeStyles: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        textStyles: {
          color: isDisabled ? disabledText : secondary.main,
          ...button,
          ...regular,
        },
      },
    },
  };

  const { shapeStyles, textStyles } = variants[variant][color];

  const buttonStyles = {
    alignItems: 'center',
    borderRadius,
    display: 'flex',
    height,
    justifyContent: 'center',
    paddingLeft: arrow ? spacing(2) : paddingHorizontal,
    paddingRight: arrow ? iconSize + spacing(2) : paddingHorizontal,
    position: 'relative',
    ...shapeStyles,
    ...(customColor && { backgroundColor: customColor }),
  };

  const arrowIconStyles = {
    position: 'absolute',
    right: spacing(),
  };

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={variants[variant].activeOpacity}
      {...rest}
    >
      <View style={buttonStyles}>
        {loading ? (
          <View style={{ displa: 'flex', flexDirection: 'row' }}>
            <Box mr={1}>
              <ActivityIndicator color={textStyles.color} />
            </Box>
            <Typography numberOfLines={1} variant="button" style={textStyles}>
              {$t('wait')}
            </Typography>
          </View>
        ) : (
          <>
            <View style={styles.labelRoot}>
              {leftIcon?.name ? (
                <Box mr={0.5}>
                  <Icon name={leftIcon?.name} color={iconColor || common.black} />
                </Box>
              ) : (
                <Box mr={1.5}>{vectorIcon}</Box> || null
              )}
              <Typography
                numberOfLines={1}
                variant="button"
                style={{ ...textStyles, ...(textColor && { color: textColor }) }}
              >
                {children}
              </Typography>
            </View>
            {arrow && <Icon style={arrowIconStyles} color="white" name="arrow-circle" />}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  arrow: true,
  color: 'primary',
  disabled: false,
  leftIcon: null,
  loading: false,
  size: 'medium',
  variant: 'contained',
  textColor: null,
  customColor: null,
  iconColor: null,
  vectorIcon: null,
};

Button.propTypes = {
  arrow: PropTypes.bool,
  children: PropTypes.node.isRequired,
  leftIcon: PropTypes.shape({
    name: PropTypes.oneOf(iconNames).isRequired,
  }),
  color: PropTypes.oneOf(['primary', 'secondary']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['medium', 'dense']),
  variant: PropTypes.oneOf(['contained', 'text']),
  textColor: PropTypes.string,
  customColor: PropTypes.string,
  iconColor: PropTypes.string,
  vectorIcon: PropTypes.node,
};

export default Button;
