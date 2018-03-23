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
		{/* THE FOLOWING IS UPDATED IN main-app.js */}
		{/* <Router history={history}>
			<Route path="/" component={Home}></Route>
			<Route path="/login" component={Login}></Route>
			<Route path="/courses" component={Courses}></Route>
			<Route path="/assignments" component={Assignments}></Route>
			<Route path="app" component={App}></Route>
			<Route path="app2" component={App2}></Route>
			<Route path="app3" component={App3}></Route>
			<Route path="app4" component={App4}></Route>
		</Router> */}
	</Provider>,
	document.getElementById("app")	// refers to id='app' in index.html
);																// this is where all the react code goes
