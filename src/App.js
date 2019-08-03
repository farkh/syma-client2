import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';

import Auth from './components/Auth/Auth';
import Transactions from './components/Transactions/Transactions';

import routes from './constants/routes';
import store from './redux/store';

// store.subscribe(() => {
//   localStorage.setItem('SymaState', JSON.stringify(store.getState()));
// });

function App() {
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
