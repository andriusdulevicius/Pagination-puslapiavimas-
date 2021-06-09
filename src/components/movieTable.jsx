import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class MovieTable extends Component {
  state = {
    movies: getMovies(),
    count: 1,
  };

  render() {
    return (
      <div>
        <h3>Movie table is here</h3>
        <ol>
          {this.state.movies.map((m) => (
            <li key={m._id}>
              <p>{m.title}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default MovieTable;
