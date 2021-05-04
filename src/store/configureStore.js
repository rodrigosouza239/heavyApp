/* eslint-disable no-console */
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from '@reducers';
import rootSaga from '@sagas';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { createFilter } from 'redux-persist-transform-filter';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';
import { reactotronConfigure } from '../../ReactotronConfig';

reactotronConfigure();

const saveSubsetFilter = createFilter('auth', ['logged', 'loginSkip', 'user']);

const persistConfig = {
  key: 'root',
  stateReconciler: autoMergeLevel2,
  storage: AsyncStorage,
  transforms: [saveSubsetFilter],
  whitelist: ['auth', 'localization'],
};

const configureStore = (initialState) => {
  const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    initialState,
    __DEV__
      ? compose(applyMiddleware(sagaMiddleware), console.tron.createEnhancer())
      : compose(applyMiddleware(sagaMiddleware)),
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  global.store = store;

  return { store, persistor };
};

export const { store, persistor } = configureStore();
