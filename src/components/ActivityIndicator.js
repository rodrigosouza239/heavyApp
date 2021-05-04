import React from 'react';
import { ActivityIndicator as NativeActivityIndicator } from 'react-native';
import { useTheme } from '@theme/';

function ActivityIndicator() {
  const {
    palette: { primary },
  } = useTheme();

  return <NativeActivityIndicator color={primary.main} size="small" />;
}

export default ActivityIndicator;
