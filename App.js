import App from './src';

if (__DEV__) {
  /* eslint-disable-next-line */
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

export default App;
