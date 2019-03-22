import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {Provider} from 'react-redux';
import reducers from './reducers';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import View from './View';

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path='/' component={App} />
            <Route path='/view/:id' component={View} />
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
