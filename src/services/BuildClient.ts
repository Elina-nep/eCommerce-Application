import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions,
  ExistingTokenMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  UserAuthOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { getExistingToken, tokenCache } from '../util';

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

const existingAuthMiddlewareOptions: ExistingTokenMiddlewareOptions = {
  force: true,
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
        .withExistingTokenFlow(currentToken, existingAuthMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build()
    : new ClientBuilder()
        .withAnonymousSessionFlow(authAnonMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build();

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: projectKey,
  });
};

const formPassFlow = (user: UserAuthOptions) => {
  console.log('new formPassFlow');
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
    // .withClientCredentialsFlow(authAnonMiddlewareOptions)
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return createApiBuilderFromCtpClient(newCtpClient).withProjectKey({
    projectKey: projectKey,
  });
};

export const formFlow = (user?: UserAuthOptions) => {
  if (user) return formPassFlow(user);
  return formAnonFlow();
};
