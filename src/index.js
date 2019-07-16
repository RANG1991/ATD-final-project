import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App/App';
import {createStore} from 'redux'
import { Provider } from 'react-redux';
import reducers from './client/App/reducers';
import {createBrowserHistory} from "history"

export const history = createBrowserHistory();

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
    , document.getElementById('root'));
