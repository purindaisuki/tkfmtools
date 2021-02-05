import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';

ReactDOM.render(
    <BrowserRouter basename={window.location.pathname || ''}>
        <Switch>
            <App />
        </Switch>
    </BrowserRouter>,
    document.querySelector('#root')
)
