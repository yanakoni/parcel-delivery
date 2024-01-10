import '@fontsource/roboto/100.css';
import '@fontsource/roboto/100-italic.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/300-italic.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/500-italic.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/700-italic.css';
import '@fontsource/roboto/900.css';
import '@fontsource/roboto/900-italic.css';
import './styles.css';
import './i18n';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './store';
// import { keycloak } from './consts';
// import { AuthClientError, AuthClientEvent } from '@react-keycloak/core/lib/types';
// import { ReactKeycloakProvider } from '@react-keycloak/web';
// import { Loader } from './components';

// const handleOnEvent = async (event: AuthClientEvent, _error?: AuthClientError) => {
//   if (_error) {
//     console.error(_error);
//     return;
//   }
//
//   if (event === 'onAuthSuccess') {
//     if (keycloak.authenticated) {
//       const token = keycloak.token;
//       const refreshToken = keycloak.refreshToken;
//       const idToken = keycloak.idToken;
//
//       console.log('onAuthSuccess', { token, refreshToken, idToken });
//       localStorage.setItem('token', token || '');
//       localStorage.setItem('refreshToken', refreshToken || '');
//       localStorage.setItem('idToken', idToken || '');
//     }
//   }
// };

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {/*<ReactKeycloakProvider*/}
    {/*  authClient={keycloak}*/}
    {/*  LoadingComponent={<Loader type="page" />}*/}
    {/*  onEvent={(event) => handleOnEvent(event)}*/}
    {/*>*/}
    <React.StrictMode>
      <App />
    </React.StrictMode>
    {/*</ReactKeycloakProvider>*/}
  </Provider>,
);
