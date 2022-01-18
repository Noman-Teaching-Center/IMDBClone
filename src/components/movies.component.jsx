import React, { Component } from 'react';
import Rating from './common/ratings/rating.component';
import Table from './common/table/table.component';
import getMovies from '../services/getMovies.service';

class Movies extends Component {
	constructor() {
		super();
		this.state = {
			movies: [],
		};
	}

	async componentDidMount() {
		const movies = await getMovies();
		this.setState({ movies });
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
				key: true,
				sort: true,
			},
			title: {
				header: 'Title',
				render: (title) => <p>{title}</p>,
				sort: false,
			},
			ratings: {
				render: (rating) => <p>{rating}</p>,
			},
			year: {
				render: (year) => <p>{year}</p>,
				sort: true,
			},
			posterUrl: {
				header: 'Poster',
				render: (posterUrl, movie) => (
					<img src={posterUrl} alt={movie.title} className="h-24" />
				),
			},
			yourRating: {
				header: 'Your Rating',
				render: (isRated, movie) => (
					<Rating
						isRated={!!isRated}
						toggleIsRated={() => this.toggleYourRating(movie.id)}
					/>
				),
			},
			exclude: ['ratings'],
		};

		return (
			<div className="flex">
				{movies.length > 0 ? (
					<Table data={movies} metadata={moviesTableMetadata} />
				) : (
					<button
						type="button"
						className="bg-indigo-500 m-auto my-2 p-4 rounded-xl text-white"
						disabled
					>
						Processing...
					</button>
				)}
			</div>
		);
	}
}

export default Movies;
