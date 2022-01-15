import moviesData from '../db/movies.data.json';

const getGenres = () => {
	const { genres } = moviesData;
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(genres);
		}, Math.random() * 2000);
	});
};

export default getGenres;
