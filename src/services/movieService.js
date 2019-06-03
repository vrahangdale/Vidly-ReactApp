import http from "./httpService";
import { apiEndpoint } from "../config.json";

function movieUrl(id) {
  return `/movies/${id}`;
}

export function getMovies() {
  return http.get("/movies");
}
export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
  //return http.delete(apiEndpoint + "/movies" + `${movieId}`);
}

export function getMovie(id) {
  //http.get(apiEndpoint + `/movies/${id}`);
  return http.get(`/movies/${id}`);
}

export function saveMovie(movie) {
  // let movieInDb = movies.find(m => m._id === movie._id) || {};
  // movieInDb.title = movie.title;
  // movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  // movieInDb.numberInStock = movie.numberInStock;
  // movieInDb.dailyRentalRate = movie.dailyRentalRate;

  // if (!movieInDb._id) {
  //   movieInDb._id = Date.now().toString();
  //   movies.push(movieInDb);
  // }

  // return movieInDb;
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post("/movies", movie);
}
