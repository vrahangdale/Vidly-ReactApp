import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import _ from "lodash";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/Paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { getGenres } from "../services/genreService";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";
// import http from "../services/httpService";
// import config from "../config.json";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };
  async componentDidMount() {
    //const { data: allGenres } = await http.get(config.apiEndpoint + "/genres");
    const { data: allGenres } = await getGenres();

    const genres = [{ _id: "", name: "All Genres" }, ...allGenres];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  movieCount = filteredMovies => {
    if (filteredMovies === 0) {
      return "There is no movies to display";
    }
    let count = filteredMovies;
    return "Showing " + count + " movies";
  };

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  // handleAdd = () => {
  //   //console.log("new movie add form clicked");
  //   //<Link to="/movie/new" />;
  // };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      sortColumn,
      movies: allMovies
    } = this.state;

    // const filteredMovies =
    //   selectedGenre && selectedGenre.name !== "All Genres"
    //     ? allMovies.filter(m => m.genre._id === selectedGenre._id)
    //     : allMovies;

    let filteredMovies = allMovies;
    if (searchQuery)
      filteredMovies = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies = allMovies.filter(m => m.genre._id === selectedGenre._id);

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

    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
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
            <div className="row">
              <Link
                //onClick={<Link to="/movie/new" />}
                to="/movie/new"
                className="btn btn-primary m-2"
              >
                New Movie
              </Link>
            </div>

            <div className="badge">{this.movieCount(count)}</div>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />

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
