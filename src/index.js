import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as Sentry from "@sentry/browser"
import * as serviceWorker from './serviceWorker';

// using sentry error tracking service for tracking uncaught errors
Sentry.init({dsn: "https://6f41d4fa720f47e6b127152098352854@sentry.io/1730652"});

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
