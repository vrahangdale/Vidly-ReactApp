import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import _ from "lodash";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/Paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  movieCount = filteredMovies => {
    if (filteredMovies === 0) {
      return "There is no movies to display";
    }
    let count = filteredMovies;
    return "Showing " + count + " movies";
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = genre => {
    //const movies = this.state.movies.filter(m => m.genre.name === genre.name);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies: allMovies
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre.name !== "All Genres"
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { count: filteredMovies.length, data: movies };
  };

  render() {
    const genres = this.state.genres;

    const { pageSize, currentPage, sortColumn } = this.state;
    const { count, data: movies } = this.getPagedData();
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
            />
          </div>
          <div className="col-9">
            <div className="badge">{this.movieCount(count)}</div>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              items={count}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
