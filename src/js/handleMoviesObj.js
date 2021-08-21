import { getMovies } from './fetch';
import { dataSet, genresSet } from './templatingSettings';

export async function handleMoviesObj({ page, query }) {
  const data = await getMovies({ page, query });
  const moviesArr = data.movies.map(movie => {
    const movieGenres = genresSet(movie.genreNames);
    const movieDate = dataSet(movie.release_date);
    return { ...movie, movieGenres, movieDate };
  });
  return { movies: moviesArr, total: data.total_results };
}
