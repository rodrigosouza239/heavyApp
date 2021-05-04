import getEnvVars from '@env/';
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';

const baseURL = getEnvVars().api;
const commonConfigs = { timeout: 120000 };

const apiPublic = axios.create({
  baseURL,
  ...commonConfigs,
});

const apiPrivate = axios.create({ baseURL, ...commonConfigs });

apiPrivate.interceptors.request.use((config) => {
  const newConfig = cloneDeep(config);
  newConfig.headers.Authorization = `Bearer ${global?.store?.getState()?.auth?.user?.token}`;
  return newConfig;
});

export { apiPublic, apiPrivate };
