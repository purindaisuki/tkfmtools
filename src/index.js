import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';

ReactDOM.render(
    <HashRouter basename={''}>
        <Switch>
            <App />
        </Switch>
    </HashRouter>,
    document.querySelector('#root')
)
