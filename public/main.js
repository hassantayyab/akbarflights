// import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import allReducers from './reducers/reducer-index';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Provider } from 'react-redux';
import MainApp from './components/main-app';


const store = createStore(allReducers, {}, applyMiddleware(reduxThunk));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<MainApp />
	</Provider>,
	document.getElementById("app")	// refers to id='app' in index.html
);																// this is where all the react code goes
