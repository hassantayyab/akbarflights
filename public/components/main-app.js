import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
// actions
import { FetchUser } from '../actions/fetchUser';
// import * as actions from '../actions';
// components
import Header from './header';
import App from './app';
import App2 from './app2';
import App3 from './app3';
import App4 from './app4';
import Assignments from './assignments';
import Courses from './courses';
import Login from './login';
import Home from './home';


class MainApp extends Component {
  componentDidMount() {
    this.props.FetchUser();
  }

  // loggedIn() {
  //   console.log(this.props.user;
  //   if (this.props.user) {

  //   }
  // }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/courses" component={Courses}></Route>
            <Route exact path="/assignments" component={Assignments}></Route>
            <Route exact path="/app1" component={App}></Route>
            <Route exact path="/app2" component={App2}></Route>
            <Route exact path="/app3" component={App3}></Route>
            <Route exact path="/app4" component={App4}></Route>
            {/* <Home/> */}
          </div>
        </Router>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    user: state.auth
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchUser:FetchUser
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainApp);
