import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import decode from 'jwt-decode';
// actions
import { FetchUser } from '../actions/fetchUser';
// components
// import requireLogin from './requireLogin';
// import { AuthContainer } from './containers/Auth'
import Header from './header';
// import App from './app';
import App from '../containers/container-answerbox2';
import Assignments from './assignments';
import Courses from './courses';
import Login from './login';
import Home from './home';

// const checkAuth = () => {
//   console.log('in checkAuth');
  
//   const token = localStorage.getItem('token');
//   const refreshToken = localStorage.getItem('refreshToken');
//   if (!token || !refreshToken) {
//     return false;
//   }

//   try {
//     // { exp: 12903819203 }
//     const { exp } = decode(refreshToken);

//     if (exp < new Date().getTime() / 1000) {
//       return false;
//     }

//   } catch (e) {
//     console.log('FALSE returned');
//     return false;
//   }
//   console.log('TRUE returned');
//   return true;
// }

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

// const AuthRoute = ({ component: Component, rest }) => (  
//   <Route
//     {...rest}
//     render={props =>
//       checkAuth() ? (
//         <Component {...props} />
//       ) : (
//           <Redirect to={{pathname: "/login"}} />
//         )
//     }
//   />
// );

class MainApp extends Component {
  componentDidMount() {
    this.props.FetchUser();
  }
  
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            {/* <Switch> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/courses" component={Courses} />
            <Route exact path="/assignments:filter?" component={Assignments} />
            <Route exact path="/app:filter?" component={App} />
            {/* </Switch> */}
            {/* <Home/> */}
          </div>
        </Router>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    user: state.auth.payload
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchUser:FetchUser
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainApp);
