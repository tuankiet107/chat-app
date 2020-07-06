import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';

const firebase = require('firebase');
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyARHRnXqS9W39GBjgHjm7aF4fe5VXjJ_7c",
  authDomain: "chat-app-10799.firebaseapp.com",
  databaseURL: "https://chat-app-10799.firebaseio.com",
  projectId: "chat-app-10799",
  storageBucket: "chat-app-10799.appspot.com",
  messagingSenderId: "337356356450",
  appId: "1:337356356450:web:84b745f10fd897e1804a3b"
});

const routing = (
  <Router>
    <Route path='/login' component={LoginComponent}></Route>
    <Route path='/signup' component={SignupComponent}></Route>
    <Route path='/dashboard' component={DashboardComponent}></Route>
  </Router>
)

ReactDOM.render(
    routing
  ,document.getElementById('root')
);

serviceWorker.unregister();
