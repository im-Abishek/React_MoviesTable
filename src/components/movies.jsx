import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    movie: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };

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
    this.setState({ currentPage: pages})
  };

  render() {
    const { length: count } = this.state.movie;
    const { currentPage, pageSize } = this.state
    if (count === 0) return <p>There are no movies in the database.</p>;
    return (
      <main className="container">
        <p>Showing {count} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movie.map((movies) => (
              <tr key={movies._id}>
                <td>{movies.title}</td>
                <td>{movies.genre.name}</td>
                <td>{movies.numberInStock}</td>
                <td>{movies.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movies.liked}
                    onLike={() => this.handleLike(movies)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movies)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </main>
    );
  }
}

export default Movies;
