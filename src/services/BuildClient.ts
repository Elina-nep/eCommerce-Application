import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
  // ExistingTokenMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions,
  // RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

import { getExistingToken, tokenCache } from '../util/tokenProcess';

export const projectKey = process.env.REACT_APP_PROJECT_KEY!;
const scopes = [process.env.REACT_APP_SCOPES!];
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

// Configure authMiddlewareOptions
const authAnonMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.REACT_APP_AUTH_URL!,
  projectKey: projectKey,
  credentials: {
    clientId: clientId!,
    clientSecret: clientSecret!,
  },
  scopes,
  fetch,
  tokenCache,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_HOST_URL!,
  fetch,
};

const formAnonFlow = () => {
  const currentToken = getExistingToken();

  const ctpClient = currentToken
    ? new ClientBuilder()
        .withRefreshTokenFlow({
          ...authAnonMiddlewareOptions,
          refreshToken: currentToken,
        })
        .withHttpMiddleware(httpMiddlewareOptions)
        .build()
    : new ClientBuilder()
        .withAnonymousSessionFlow(authAnonMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: projectKey,
  });
};

const formPassFlow = (user: UserAuthOptions) => {
  localStorage.clear();
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: process.env.REACT_APP_AUTH_URL!,
    projectKey: projectKey,
    credentials: {
      clientId: clientId!,
      clientSecret: clientSecret!,
      user: user,
    },
    scopes,
    fetch,
    tokenCache,
  };

  const newCtpClient = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  localStorage.setItem('user', 'true');

  return createApiBuilderFromCtpClient(newCtpClient).withProjectKey({
    projectKey: projectKey,
  });
};

export const formFlow = (user?: UserAuthOptions) => {
  if (user) return formPassFlow(user);
  return formAnonFlow();
};
