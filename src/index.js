import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Schedule from './Components/Schedule';
import Login from './Components/Login';
import * as serviceWorker from './serviceWorker';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <PrivateRoute path="/Schedule">
          <Schedule />
        </PrivateRoute>
        <PublicRoute path="/Login">
          <Login />
        </PublicRoute>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
