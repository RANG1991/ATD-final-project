import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App/App';
import {createStore} from 'redux'
import { Provider } from 'react-redux';
import reducers from './client/App/reducers';
import {createBrowserHistory} from "history";
import throttle from 'lodash/throttle';
import {loadState, saveState} from "./client/App/localStorage";

const persistedState = loadState();

export const history = createBrowserHistory();

const store = createStore(reducers, persistedState);

store.subscribe(throttle(() => {
    saveState({
        app: store.getState().app,
        currentUser: store.getState().currentUser,
        navigation: store.getState().navigation,
        newReview: store.getState().newReview,
    });
}, 1000));

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
    , document.getElementById('root'));
