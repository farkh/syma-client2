import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { setCurrentUser } from './redux/actions/auth.actions';
import { setAuthToken } from './services/auth';
import { getCookie } from './services/cookies';
import routes from './constants/routes';

const Auth = lazy(() => import('./pages/Auth/Auth'));
const Transactions = lazy(() => import('./pages/Transactions/Transactions'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const UserSettings = lazy(() => import('./pages/UserSettings/UserSettings'));
const Calendar = lazy(() => import('./pages/Calendar/Calendar'));
const Categories = lazy(() => import('./pages/Categories/Categories'));

const App = (props) => {
  const token = getCookie('token');
  if (token) {
    setAuthToken(token);
    props.setCurrentUser(jwtDecode(token));
  }
  
  return (
    <Router>
      <Suspense fallback="Loading...">
        <Switch>
          <Route exact path={routes.DASHBOARD} component={() => <Dashboard />} />
          <Route exact path={routes.AUTH} component={() => <Auth />} />
          {token && <Redirect exact from="/" to={routes.DASHBOARD} />}
          {token && <Route exact path={routes.USER_SETTINGS} component={() => <UserSettings />} />}
          {token && <Route exact path={routes.TRANSACTIONS} component={() => <Transactions />} />}
          {token && <Route exact path={routes.CALENDAR} component={() => <Calendar />} />}
          {token && <Route exact path={routes.CATEGORIES} component={() => <Categories />} />}
          <Route render={() => <div><h1>Not found</h1> <a href={routes.DASHBOARD}>Go home</a></div>} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default connect(null, { setCurrentUser })(App);
