import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {
    return (
      <div className='navbar-fixed'>

        <nav>
          <div className="nav-wrapper pink darken-4">
            <Link id='title3' to='/' className="left brand-logo blue-grey-text text-lighten-4">Book Flight Tickets</Link>
          </div>
        </nav>

      </div>
    );
  };
};

export default Header;
