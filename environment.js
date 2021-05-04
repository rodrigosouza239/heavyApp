const envs = {
  dev: {
    api: 'https://api.heavymotors.luby.com.br/api/',
    webSiteUrl: 'https://heavymotors.luby.com.br',
  },
  prod: {
    api: 'https://api.heavymotors.luby.com.br/api/',
    webSiteUrl: 'https://heavymotors.luby.com.br',
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return envs.dev;
  }

  return envs.prod;
};

export default getEnvVars;
