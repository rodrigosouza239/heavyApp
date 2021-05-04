import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { useTheme } from '@theme';
import PropTypes from 'prop-types';
import React from 'react';

const selection = require('@assets/fonts/icons/selection.json');

const IcomoonIcon = createIconSetFromIcoMoon(selection, 'icomoon');

export const iconNames = [
  'angle-down',
  'angle-left',
  'angle-right',
  'angle-up',
  'arrow-circle',
  'building',
  'calendar',
  'camera',
  'check-circle',
  'check-square',
  'check',
  'clock',
  'coins',
  'document',
  'dollar-sign',
  'envelope-open-text',
  'exclamation-circle',
  'exclamation-triangle',
  'file-invoice-dollar',
  'file',
  'gender',
  'globe-americas',
  'hand-holding-usd',
  'handshake',
  'help',
  'home',
  'images',
  'lock',
  'map-marker',
  'mobile',
  'paper-plane',
  'pencil',
  'phone',
  'plus',
  'power-off',
  'search',
  'share',
  'square',
  'star',
  'tachometer-fast',
  'times',
  'tractor',
  'trash',
  'user-cog',
  'user',
  'visibility-off',
  'visibility',
  'facebook2',
  'google2',
  'appleinc',
];

function Icon({ name, color, style, size, disabled }) {
  const theme = useTheme();
  const { palette, icon } = theme;

  const {
    common: { white },
    primary,
    secondary,
    action,
  } = palette;

  const mapColor = {
    white,
    primary: primary.main,
    secondary: secondary.main,
  };

  const iconStyles = {
    color: disabled ? action.disabledText : mapColor[color] || color,
  };

  return <IcomoonIcon style={[iconStyles, style]} name={name} size={size || icon.size} />;
}

Icon.defaultProps = {
  color: 'primary',
  disabled: false,
  size: null,
  style: null,
};

Icon.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.oneOf(iconNames).isRequired,
  size: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Icon;
