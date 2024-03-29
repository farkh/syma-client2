import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Auth from './components/Auth/Auth';
import Transactions from './components/Transactions/Transactions';
import Home from './components/Home/Home';
import UserSettings from './components/UserSettings/UserSettings';

import { setCurrentUser } from './redux/actions/auth.actions';
import { setAuthToken } from './services/auth';
import { getCookie } from './services/cookies';
import routes from './constants/routes';

const App = (props) => {
  const token = getCookie('token');
  if (token) {
    setAuthToken(token);
    props.setCurrentUser(jwtDecode(token));
  }
  
  return (
    <Router>
      <Switch>
        <Route exact path={routes.HOME} component={() => <Home />} />
        <Route exact path={routes.AUTH} component={() => <Auth />} />
        <Route exact path={routes.USER_SETTINGS} component={() => <UserSettings />} />
        <Route exact path={routes.TRANSACTIONS} component={() => <Transactions />} />
      </Switch>
    </Router>
  );
}

export default connect(null, { setCurrentUser })(App);
