import moviesData from '../db/movies.data.json';

const getMovies = () => {
	const { movies } = moviesData;
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(movies);
		}, Math.random() * 2000);
	});
};

export default getMovies;
