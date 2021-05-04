import { useLinking } from '@react-navigation/native';
import * as Linking from 'expo-linking';

export default (containerRef) => {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/'), 'hmapp://', 'https://heavymotors.luby.com.br'],
    config: {
      screens: {
        root: {
          screens: {
            'tab-home': {},
            'tab-search': {
              initialRouteName: 'search-home',
              screens: {
                'search-product-details': {
                  path: 'detail/:vehicle_id',
                },
              },
            },
            'tab-business': {
              initialRouteName: 'business-home',
            },
            'tab-ads': {},
          },
        },
      },
    },
  });
};
