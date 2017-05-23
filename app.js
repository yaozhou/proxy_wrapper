import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory, hashHistory, browserHistory } from 'react-router';
import { createHashHistory } from 'history';

const History = useRouterHistory(createHashHistory)();

import Cover from './components/Cover' ;

let element = document.getElementById('reactEntry');
ReactDOM.render(( 
        <Router history={hashHistory}>
            <Route path="/" component={Cover} />
        </Router>
  ), element) ;