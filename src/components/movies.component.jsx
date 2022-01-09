import React, { Component } from 'react';
import Rating from './common/ratings/rating.component';
import Table from './common/table/table.component';

class Movies extends Component {
	constructor() {
		super();
		this.state = {
			movies: [
				{
					id: '1',
					title: 'The Godfather',
					year: '1994',
					ratings: '9.2',
					yourRating: true,
				},
				{
					id: '2',
					title: '12 Angry Men',
					year: '1957',
					ratings: '8.9',
					yourRating: false,
				},
				{
					id: '3',
					title: 'Pulp Fiction',
					year: '1994',
					ratings: '8.8',
					yourRating: true,
				},
			],
		};
	}

	toggleYourRating = (movieId) => {
		const { movies } = this.state;

		const updatedMovies = movies.map((movie) => {
			if (movie.id === movieId) {
				return {
					...movie,
					yourRating: !movie.yourRating,
				};
			}
			return movie;
		});

		this.setState({
			movies: updatedMovies,
		});
	};

	render() {
		const { movies } = this.state;
		const moviesTableMetadata = {
			id: {
				header: 'Rank',
				render: (id) => <p>{id}</p>,
			},
			title: {
				header: 'Title',
				render: (title) => <p className="text-red-500">{title}</p>,
			},
			year: {
				render: (year) => <p>{year}</p>,
			},
			ratings: {
				render: (rating) => <p>{rating}</p>,
			},
			yourRating: {
				header: 'Your Rating',
				render: (isRated, movie) => (
					<Rating
						isRated={isRated}
						toggleIsRated={() => this.toggleYourRating(movie.id)}
					/>
				),
			},
			exclude: ['ratings', 'title'],
		};

		return <Table data={movies} metadata={moviesTableMetadata} />;
	}
}

export default Movies;
