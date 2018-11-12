import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {hashHistory, IndexRoute, Route, Router} from 'react-router'

import App from './app'
import SyncEntryConvertToIndex from './convert_route_sync';

import SyncRoutes from './modules/moduleRoutesAsync';


//在网页上看样式暴露的路由
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            {SyncEntryConvertToIndex('', SyncRoutes)}
        </Route>
    </Router>
    , document.getElementById('root'))