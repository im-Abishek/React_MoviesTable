import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import List from "./common/list";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movie: [],
    genre: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { columnName: "title", order: "asc" },
  };

  componentDidMount() {
    const genre = [{ _id: "", name: "All Genre" }, ...getGenres()];
    this.setState({
      movie: getMovies(),
      genre,
    });
  }

  handleLike = (movies) => {
    const movie = [...this.state.movie];
    const index = movie.indexOf(movies);
    movie[index] = { ...movie[index] };
    movie[index].liked = !movie[index].liked;
    this.setState({ movie });
  };

  handleDelete = (movies) => {
    const movie = this.state.movie.filter((mv) => mv._id !== movies._id);
    this.setState({ movie });
  };

  handlePageChange = (pages) => {
    this.setState({ currentPage: pages });
  };

  handleGenreSelected = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedata = () => {
    const {
      currentPage,
      pageSize,
      movie: allMovie,
      selectedGenre,
      sortColumn,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovie.filter((m) => m.genre._id === selectedGenre._id)
        : allMovie;

    const sorted = _.orderBy(
      filtered,
      [sortColumn.columnName],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, movies };
  };

  render() {
    const { length: count } = this.state.movie;

    const { currentPage, pageSize, sortColumn } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, movies } = this.getPagedata();

    return (
      <main className="container">
        <div className="row">
          <div className="col-3 m-2">
            <List
              items={this.state.genre}
              selectedGenre={this.state.selectedGenre}
              onGenreSelected={this.handleGenreSelected}
            />
          </div>
          <div className="col m-2">
            <p>Showing {totalCount} movies in the database.</p>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;
