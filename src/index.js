import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Schedule from './Components/Schedule';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import * as serviceWorker from './serviceWorker';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter hashType="noslash">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PublicRoute path="/Bard">
          <App />
        </PublicRoute>
        <PrivateRoute path="/Schedule">
          <Schedule />
        </PrivateRoute>
        <PublicRoute path="/Login">
          <Login />
        </PublicRoute>
        <PublicRoute path="/Register">
          <Register />
        </PublicRoute>
        <Route
          path="/GitHub"
          component={() => {
            window.location.href =
              'https://github.com/BrandonTreston/Scheduling_App';
            return null;
          }}
        />
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
