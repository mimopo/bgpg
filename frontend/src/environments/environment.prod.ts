export const environment = {
  production: true,
  get server() {
    return window.location.protocol + '//' + window.location.host;
  },
};
