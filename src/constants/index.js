import { Platform } from 'react-native';
import Constants from 'expo-constants';

const { statusBarHeight } = Constants;

export const HTTP_STATUS = {
  NOT_FOUND: 404,
};

export const DELAY_TIME = {
  default: 500,
  slow1x: 1000,
  slow1_5x: 1500,
  slow2x: 2000,
};

export const PUBLIC_USER = {
  email: 'public@heavymotors.com.br',
  password: 'public',
};

export const getHeaderHeight = (includeStatusBarHeight = true) => {
  const computedStatusBarHeight = includeStatusBarHeight ? statusBarHeight : 0;

  return Platform.select({
    ios: computedStatusBarHeight + 44,
    android: computedStatusBarHeight + 56,
  });
};
