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
import { keycloak } from './consts';
import { AuthClientTokens } from '@react-keycloak/core/lib/types';
import { ReactKeycloakProvider } from '@react-keycloak/web';

const tokenHandler = async (tokens: AuthClientTokens) => {
  if (!tokens.token) {
    keycloak.login();
  } else {
      const token = keycloak.token;
      const refreshToken = keycloak.refreshToken;
      const idToken = keycloak.idToken;

      console.log('onAuthSuccess', { token, refreshToken, idToken });
      localStorage.setItem('token', token || '');
      localStorage.setItem('refreshToken', refreshToken || '');
      localStorage.setItem('idToken', idToken || '');
    }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider authClient={keycloak} onTokens={tokenHandler}>
    <Provider store={store}>

        <React.StrictMode>
          <App />
        </React.StrictMode>
    </Provider>
  </ReactKeycloakProvider>,
);
