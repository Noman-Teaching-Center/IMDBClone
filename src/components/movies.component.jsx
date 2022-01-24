import React, { Component } from 'react';
import _ from 'lodash';
import Rating from './common/ratings/rating.component';
import Table from './common/table/table.component';
import getMovies from '../services/getMovies.service';
import getGenres from '../services/getGenres.service';
import Filter from './common/filter.component';

class Movies extends Component {
	constructor() {
		super();

		this.state = {
			movies: [],
			genres: [],
			selectedGenres: [],
		};
	}

	async componentDidMount() {
		const movies = await getMovies();
		const genres = await getGenres();
		this.setState({ movies, genres });
	}

	filterMoviesByGenre = () => {
		const { movies, selectedGenres } = this.state;
		if (selectedGenres.length < 1) return movies;
		const updatedMovies = movies.filter(
			({ genres }) => _.intersection(genres, selectedGenres).length > 0
		);
		return updatedMovies;
	};

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

	selectGenre = (genre) => {
		const { selectedGenres } = this.state;
		if (!selectedGenres.includes(genre)) {
			this.setState({ selectedGenres: [...selectedGenres, genre] });
		} else {
			this.setState({
				selectedGenres: selectedGenres.filter((_genre) => _genre !== genre),
			});
		}
	};

	render() {
		const { movies, genres, selectedGenres } = this.state;
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
			paginate: {
				startingPage: 1,
				itemsPerPage: 5,
			},
		};

		const filteredMovies = this.filterMoviesByGenre();

		return (
			<div className="flex flex-col m-4">
				{movies.length > 0 ? (
					<div className="flex flex-row space-x-4">
						<Filter
							categories={genres}
							currentSelection={selectedGenres}
							onSelect={this.selectGenre}
						/>
						<div className="flex-grow">
							<Table data={filteredMovies} metadata={moviesTableMetadata} />
						</div>
					</div>
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
