import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import jwtDecode from 'jwt-decode';

import Auth from './components/Auth/Auth';
import Transactions from './components/Transactions/Transactions';

import { setCurrentUser } from './redux/actions/auth.actions';
import { setAuthToken } from './services/auth';
import { getCookie } from './services/cookies';
import routes from './constants/routes';
import store from './redux/store';

const token = getCookie('token');
if (token) {
  setAuthToken(token);
  store.dispatch(setCurrentUser(jwtDecode(token)));
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Container fluid>
          <Switch>
            <Route exact path={routes.AUTH} component={() => <Auth />} />
            <Route exact path={routes.TRANSACTIONS} component={() => <Transactions />} />
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
