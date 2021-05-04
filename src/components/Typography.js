import { useTheme } from '@theme';
import colorManipulator from 'color';
import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';

function Typography({
  align,
  alpha,
  children,
  color,
  fontWeight,
  gutterBottom,
  style,
  uppercase,
  variant,
  ...rest
}) {
  const theme = useTheme();

  const { typography, spacing, palette } = theme;
  const { fonts } = typography;
  const {
    text,
    error,
    common: { white },
    orange,
  } = palette;
  const variantStyles = typography[variant];
  const { fontFamily } = fonts[fontWeight] || variantStyles;

  const mapColor = {
    error: error.main,
    textPrimary: text.primary,
    textSecondary: text.secondary,
    white,
    orange: orange.main,
  };

  let textColor = mapColor[color];

  if (alpha) {
    textColor = colorManipulator(mapColor[color]).alpha(alpha).rgb().string();
  }

  const styles = {
    ...variantStyles,
    color: textColor,
    fontFamily,
    marginBottom: gutterBottom ? spacing() : 0,
    textAlign: align,
  };

  return (
    <Text style={[styles, style]} allowFontScaling={false} {...rest}>
      {React.Children.map(children, (child) =>
        typeof child === 'string' && uppercase ? child.toUpperCase() : child,
      )}
    </Text>
  );
}

Typography.defaultProps = {
  align: 'auto',
  alpha: null,
  children: null,
  color: 'textPrimary',
  fontWeight: undefined,
  gutterBottom: false,
  style: null,
  uppercase: false,
  variant: 'body1',
};

Typography.propTypes = {
  align: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
  alpha: PropTypes.number,
  children: PropTypes.node,
  color: PropTypes.oneOf(['textPrimary', 'textSecondary', 'error', 'white', 'orange']),
  fontWeight: PropTypes.oneOf(['regular', 'medium', 'bold']),
  gutterBottom: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  uppercase: PropTypes.bool,
  variant: PropTypes.oneOf(['h1', 'h2', 'h6', 'subtitle', 'body1', 'body2', 'button', 'caption']),
};

export default Typography;
