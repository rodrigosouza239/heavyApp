import { useTheme } from '@theme/';
import useDefaultScreenOptions from './useDefaultScreenOptions';

function useStackOptions() {
  const defaultScreenOptions = useDefaultScreenOptions();

  const {
    palette: {
      common: { white },
    },
    navigation: {
      header: { backgroundColor },
    },
  } = useTheme();

  return {
    headerStyle: { backgroundColor },
    headerTintColor: white,
    ...defaultScreenOptions,
  };
}

export default useStackOptions;
