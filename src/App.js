import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Auth from './components/Auth/Auth';

import routes from './constants/routes';

function App() {
  return (
    <Router>
      <Container fluid>
        <Switch>
          <Route exact path={routes.AUTH} component={() => <Auth />} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
