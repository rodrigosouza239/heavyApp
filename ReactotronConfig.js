/* eslint-disable no-console */
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const getLocalDebuggerIP = () => {
  const { manifest } = Constants;

  return manifest.debuggerHost.split(':')[0];
};
export const reactotronConfigure = () => {
  if (__DEV__) {
    const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
      .configure({ name: 'Heavy Motors', host: getLocalDebuggerIP() })
      .use(reactotronRedux())
      .use(sagaPlugin())
      .useReactNative({
        networking: {
          ignoreUrls: /symbolicate|logs/,
        },
      })
      .connect();

    console.tron = tron;

    tron.clear();
  } else {
    console.tron = class {
      static log(...rest) {
        console.log(...rest);
      }
    };
  }
};

export default reactotronConfigure;
