import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Rating from './common/ratings/rating.component';
import Table from './common/table/table.component';
import getMovies from '../services/getMovies.service';
import getGenres from '../services/getGenres.service';
import Filter from './common/filter.component';

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);

	useEffect(async () => {
		setMovies(await getMovies());
		setGenres(await getGenres());
	}, []);

	const filterMoviesByGenre = () => {
		if (selectedGenres.length < 1) return movies;
		const filteredMovies = movies.filter(
			({ genres: movieGenres }) =>
				_.intersection(movieGenres, selectedGenres).length > 0
		);
		return filteredMovies;
	};

	const toggleYourRating = (movieId) => {
		const updatedMovies = movies.map((movie) => {
			if (movie.id === movieId) {
				return {
					...movie,
					yourRating: !movie.yourRating,
				};
			}
			return movie;
		});

		setMovies(updatedMovies);
	};

	const selectGenre = (genre) => {
		if (!selectedGenres.includes(genre)) {
			setSelectedGenres((prevSelectedGenres) => [...prevSelectedGenres, genre]);
		} else {
			setSelectedGenres((prevSelectedGenres) =>
				prevSelectedGenres.filter((_genre) => _genre !== genre)
			);
		}
	};

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
					toggleIsRated={() => toggleYourRating(movie.id)}
				/>
			),
		},
		exclude: ['ratings'],
		paginate: {
			startingPage: 1,
			itemsPerPage: 5,
		},
	};

	const filteredMovies = filterMoviesByGenre();

	return (
		<div className="flex flex-col m-4">
			{movies.length > 0 ? (
				<div className="flex flex-row space-x-4">
					<Filter
						categories={genres}
						currentSelection={selectedGenres}
						onSelect={selectGenre}
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
};

export default Movies;
