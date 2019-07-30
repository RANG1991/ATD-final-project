import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App/App';
import {createStore,applyMiddleware} from 'redux'
import { Provider } from 'react-redux';
import reducers from './client/App/reducers';
import {createBrowserHistory} from "history";
import throttle from 'lodash/throttle';
import createSagaMiddleware from 'redux-saga'
import {watchDataPass} from './client/App/Sagas'
import {loadState, saveState} from "./client/App/localStorage";

//localStorage.clear();
const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();


const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchDataPass);

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
    , document.getElementById('root'));
