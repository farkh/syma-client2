import React from 'react';
import ReactDOM from 'react-dom';
import { StoreContext } from 'redux-react-hook';

import App from './App';
import store from './redux/store';
import './index.scss';

ReactDOM.render(
    <StoreContext.Provider value={store}>
        <App />
    </StoreContext.Provider>,
    document.getElementById('root'),
);
