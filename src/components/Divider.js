import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@theme/';
import Box from './Box';

function Divider(props) {
  const {
    palette: { divider },
  } = useTheme();

  const dividerStyles = {
    height: StyleSheet.hairlineWidth,
    backgroundColor: divider,
  };

  return <Box style={dividerStyles} {...props} />;
}

export default Divider;
