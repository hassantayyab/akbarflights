import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    // console.log(this.props.auth);
    const user = this.props.auth;
    switch (user) {
      case null:
        return;
      case false:
        const signIn = <li><a href="/login" className="card-panel hoverable amber darken-4 btn" id='signIn'>Sign in</a></li>
        return signIn;
      default:
        // <li>{this.props.auth}</li>
        const loggedIn = [
          <li><img id='thumbnail' className="circle responsive-img" src={user.thumbnail} /></li>,
          <li id="username" className="blue-grey-text text-lighten-4">{user.username}</li>,
          <li><a href="/auth/logout" className="card-panel hoverable amber darken-4 btn" id='signIn'>Log out</a></li>
        ];
        return loggedIn;
    }
  }

  render() {
    return (
      <div className='navbar-fixed'>

        <nav>
          <div className="nav-wrapper blue-grey darken-4">
            <Link id='title3' to={this.props.auth ? '/courses' : '/'} className="left brand-logo blue-grey-text text-lighten-4"><img id='img' src="./img/logo.png" />AutoGrader</Link>
            {/* <ul id="middleContent" className="hide-on-med-and-down">
              <li className="blue-grey-text text-lighten-4">Middle Content</li>
            </ul> */}
            <ul id="nav-mobile" className="right show-on-medium-and-down">
              {this.renderContent()}
            </ul>
          </div>
        </nav>

      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    auth: state.auth.payload
  };
}

export default connect(mapStateToProps)(Header);
