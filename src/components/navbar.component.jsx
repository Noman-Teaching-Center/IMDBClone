import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-dark justify-content-between p-4">
			<div>
				<Link to="/" className="navbar-brand font-extrabold">
					FAKE IMDB
				</Link>
				<Link to="/movies" className="navbar-brand">
					Movies
				</Link>
				<Link to="/create-new-movie" className="navbar-brand">
					Create a new movie
				</Link>
			</div>
			<div>
				<Link to="/signup" className="navbar-brand">
					Signup
				</Link>
				<Link to="/signin" className="navbar-brand">
					Signin
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
