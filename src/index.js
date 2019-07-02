import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {createStore} from 'redux'
import { Provider } from 'react-redux';
import reducers from './reducers';
import createBrowserHistory from "history/createBrowserHistory"

export const history = createBrowserHistory({
    forceRefresh: false
});

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
    , document.getElementById('root'));
