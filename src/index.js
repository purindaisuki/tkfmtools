import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/App';

ReactDOM.render(
    <BrowserRouter basename={'/tkfmtools' || ''}>
        <Switch>
            <App />
        </Switch>
    </BrowserRouter>,
    document.querySelector('#root')
)
