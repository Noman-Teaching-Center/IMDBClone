import React, { Component } from 'react';
import Movies from './components/movies.component';
import Navbar from './components/navbar.component';
import Students from './components/students.component';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
	render() {
		return (
			<>
				<Navbar />
				<Movies />
				<Students />
			</>
		);
	}
}

export default App;
