import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetch } from '../actions/fetchUser';
import Header from './header';
import App from './app';
import Home from './home';
import axios from 'axios';

class MainApp extends Component {
  // fetchUser() {
  //   const params = {
  //     username: this.props.username,
  //     password: this.props.password,
  //     multiplier: this.props.multiplier
  //   }
  //   console.log('params in main-app:',params)
  //   axios.get('/api/user' + '/' + params)
  //     .then(res => {
  //       console.log('in .then of main-app', res)
  //       this.props.fetch(res);
  //     })
  //     .catch(err => {
  //       console.log('ERROR in get fetchUser', err)
  //     });
  // }

  // componentDidMount() {
  //   this.fetchUser();
  // }

  // getPage() {
  //   if (this.props.username==null) {
  //     return (
  //       <Route exact path="/" component={Home} />
  //     );
  //   }
  //   else {
  //     return (
  //       <Route exact path="/" component={App} />
  //     );
  //   }
  // }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            {/* {this.getPage()} */}
            <Route exact path="/" component={App} />
          </div>
        </Router>
      </div>
    );
  };
};

function mapStateToProps(state) {
  // console.log('user in main-app:', state.user);
  return {
    status: state.user.status,
    username: state.user.username,
    password: state.user.password,
    multiplier: state.user.multiplier
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    fetch,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainApp);
