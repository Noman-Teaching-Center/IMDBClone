import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/signin.component';
import SignUp from './components/auth/signup.component';
import CreateNewMovie from './components/createNewMovie.component';
import Home from './components/home.component';
import Movies from './components/movies.component';
import Navbar from './components/navbar.component';

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home name="aa" />} />
				<Route path="/movies" element={<Movies />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/create-new-movie" element={<CreateNewMovie />} />
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
		</>
	);
};

export default App;
