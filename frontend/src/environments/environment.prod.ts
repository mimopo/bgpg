import { Environment } from '../types/environment';

export const environment: Environment = {
  production: true,
  get server(): string {
    return window.location.protocol + '//' + window.location.host;
  },
  connectOptions: {},
  requestTimeout: 1000,
};
