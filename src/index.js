import React from 'react';
import ReactDOM from 'react-dom/client';
// import "./scss/styles.scss";
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import * as atatus from 'atatus-spa';

atatus.config('72ce954a125a40aa8a6e4836ce1f7663').install();
// atatus.notify(new Error('Test Atatus Setup')); //Commenting this out but leaving it with a reminder, and explanation of why it did not initially work, having an Adblocker on prevents traffic to/from Atatus

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
