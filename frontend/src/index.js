import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';
import { positions ,transitions ,Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
 import common_in from './translations/in/common.json'
import common_pk from './translations/pk/common.json'
import common_bd from './translations/bd/common.json'
import common_en from './translations/en/common.json'

const allowedLanguages = ['pk','bd','en','in'];

const defaultLng = 'en';
let lng = defaultLng;

const storageLanguage = localStorage.getItem('language');
if (storageLanguage && allowedLanguages.indexOf(storageLanguage) > -1) {
  lng = storageLanguage;
}
i18next.init({
  whitelist: allowedLanguages,
  interpolation: { escapeValue: false },
  lng: lng,
        resources: {
            en: {
                common: common_en
            },
            bd: {
                common: common_bd
            },
            pk: {
              common : common_pk
            },
            in:{
              common: common_in
            }
        },
 
});

const options = {
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options} >
    <I18nextProvider i18n={i18next}>
    <App />
    </I18nextProvider>
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);
