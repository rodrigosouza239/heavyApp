import { apiPublic } from '@api/';
import pMinDelay from 'p-min-delay';
import { DELAY_TIME } from '@constants/';

export function login({ email, password, expo_token }) {
  return pMinDelay(
    apiPublic.post('/login', null, {
      params: {
        email,
        password,
        remember_me: 1,
        expo_token,
      },
    }),
    DELAY_TIME.slow1x,
  );
}

export function register(user) {
  return pMinDelay(apiPublic.post('user/action/PublicRegister', user), DELAY_TIME.slow1x);
}

export function forgotPassword(email) {
  return apiPublic.post(`requestpassword`, null, {
    params: {
      email,
    },
  });
}

export function fetchCountries() {
  return apiPublic.get('country/select');
}

export function checkPostalCode(params) {
  return apiPublic.post('user_info/action/SearchPostalcode', params);
}

export function logout() {
  // TODO: @diegorodriguesvieira
}

export function loginFacebook(params) {
  return pMinDelay(
    apiPublic.post('/auth/social/facebook/login', null, {
      params,
    }),
    DELAY_TIME.slow1x,
  );
}

export function loginGoogle(params) {
  return pMinDelay(
    apiPublic.post('/auth/social/google/login', null, {
      params,
    }),
    DELAY_TIME.slow1x,
  );
}

export function loginMicrosoft(params) {
  return pMinDelay(
    apiPublic.post('/auth/social/microsoft/login', null, {
      params,
    }),
    DELAY_TIME.slow1x,
  );
}

export function loginApple(params) {
  return pMinDelay(
    apiPublic.post('/auth/social/apple/login', null, {
      params,
    }),
    DELAY_TIME.slow1x,
  );
}
