import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movie: getMovies(),
  };

  totalMovies = () => {
    return (
      <p>
        Showing <span className="fs-3 fw-bold">{this.state.movie.length}</span>{" "}
        from the database.!!!
      </p>
    );
  };

  handleDelete = (movies) => {
    const movie = this.state.movie.filter(mv => mv._id !== movies._id);
    this.setState({movie})
  }

  render() {
    return (
      <main className="container">
        {this.totalMovies()}
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
      </main>
    );
  }
}

export default Movies;
