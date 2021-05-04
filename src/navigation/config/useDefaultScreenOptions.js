import useTranslation from '@i18n/';
import { CardStyleInterpolators } from '@react-navigation/stack';

function useDefaultScreenOptions() {
  const $t = useTranslation();

  return {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTruncatedBackTitle: $t('back'),
  };
}

export default useDefaultScreenOptions;
