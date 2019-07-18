import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App/App';
import {createStore} from 'redux'
import { Provider } from 'react-redux';
import reducers from './client/App/reducers';
import {createBrowserHistory} from "history";
import throttle from 'lodash/throttle';
import {loadState, saveState} from "./client/App/localStorage";

//localStorage.clear();

const persistedState = loadState();

export const history = createBrowserHistory();

const store = createStore(reducers, persistedState);

store.subscribe(throttle(() => {
    let newState = {};
    let oldState = store.getState();
    for (let key in oldState){
        newState[key] = oldState[key].toJS();
    }
    saveState(newState);
}, 1000));

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
    , document.getElementById('root'));
