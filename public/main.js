import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import allReducers from './reducers/reducer-index';
import { Router,Route,browserHistory,IndexRoute } from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import {Provider} from 'react-redux';
import App from './components/app';
import App2 from './components/app2';
import App3 from './components/app3';
import App4 from './components/app4';
import Assignments from './components/assignments';
import Courses from './components/courses';
import Login from './components/login';
import Home from './components/home';


const store = createStore(allReducers);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Home}>
			</Route>
			<Route path="/login" component={Login}>
			</Route>
			<Route path="/courses" component={Courses}>
			</Route>
			<Route path="/assignments" component={Assignments}>
			</Route>
			<Route path="app" component={App}>
			</Route>
			<Route path="app2" component={App2}>
			</Route>
			<Route path="app3" component={App3}>
			</Route>
			<Route path="app4" component={App4}>
			</Route>
		</Router>
	</Provider>,
	document.getElementById("app")
	);
