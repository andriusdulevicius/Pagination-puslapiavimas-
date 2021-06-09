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
        <h3>Please see out movies</h3>
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

// 1 prisideti bootstrap@4.6
// 2 isitrauksim bootsrap css

// 3 sugeneruosi lentele su movie duomenimis
//https://getbootstrap.com/docs/4.6/content/tables/

// 4 prisideti dar viena stulpeli ir jamae turetu buti delete mygtukas

export default MovieTable;
