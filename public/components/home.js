import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class Home extends Component {
	render() {
		return (
			<div>
				{/* MOVED TO HEADER */}
				{/* <nav>
					<div className="nav-wrapper blue-grey darken-4">
						<a id='title3' href='/' className="brand-logo"><img id='img' src="./img/logo.png" />AutoGrader</a>

						<ul id="nav-mobile" className="right hide-on-med-and-down">
							<li><a href="/login" className="card-panel hoverable amber darken-4 btn" id='signIn'>Sign in</a></li>
						</ul>
					</div>
				</nav> */}
				{/*  */}
				
				{/* footer */}
				<div id='footer'>
					<footer className="page-footer blue-grey darken-4">
						<div className="container">
							<div className="col l6 s12">
								<h5 className="blue-grey-text text-lighten-5">AutoGrader</h5>
								<p className="grey-text text-lighten-4">Make grading easy and fun.</p>
							</div>
						</div>
						<div className="footer-copyright blue-grey darken-3">
							<div className="container blue-grey-text text-lighten-5">© 2018 AutoGrader, All rights reserved.<a className="blue-grey-text text-lighten-5 right" href="#!">More Links</a>
							</div>
						</div>
					</footer>
				</div>
				{/* footer end */}
			</div>
		);
	};
};

export default Home;
