import { useTheme } from '@theme/';
import color from 'color';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';

function ShadowPaper({ style, children, disableShadow }) {
  const {
    palette: {
      common: { white, black },
    },
    shape: { borderRadius },
  } = useTheme();

  const styles = {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color(black).alpha(0.1).rgb().toString(),
    borderRadius: borderRadius * 1.5,
    ...(disableShadow
      ? null
      : {
          shadowColor: black,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          elevation: 2,
        }),

    backgroundColor: white,
  };

  return <View style={[styles, style]}>{children}</View>;
}

ShadowPaper.defaultProps = {
  children: null,
  disableShadow: null,
  style: null,
};

ShadowPaper.propTypes = {
  children: PropTypes.node,
  disableShadow: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ShadowPaper;
