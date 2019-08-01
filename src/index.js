import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App/App';
import {createStore,applyMiddleware} from 'redux'
import { Provider } from 'react-redux';
import reducers from './client/App/reducers';
import {createBrowserHistory} from "history";
import createSagaMiddleware from 'redux-saga'
import {watchDataPass} from './client/App/Sagas'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchDataPass);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
        <App />
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));
