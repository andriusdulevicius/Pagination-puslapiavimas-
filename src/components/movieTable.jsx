import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import MovieRow from './movieRow';
import Pagination from './common/pagination';
import { paginate, sortGenres } from './../utils/paginate';
import ListGroup from './common/listGroup';

class MovieTable extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: '',
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete = (movieId) => {
    console.log('You are trying to delete, WHy ?', movieId);
    const moviesWithoutTheOneWeDeleted = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies: moviesWithoutTheOneWeDeleted });
  };

  handlePageChange = (pageNum) => {
    this.setState({ currentPage: pageNum });
  };

  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre });
  };

  render() {
    const { movies: mv, currentPage, pageSize, currentGenre, genres } = this.state;
    if (mv.length === 0) return <div className='alert alert-warning'>There are no movies at the moment</div>;

    //paduoti tik tiek movies kiek reikia pagal pagination
    const movieArrToMap = paginate(mv, currentPage, pageSize);
    const genresArr = sortGenres(mv, currentGenre);

    return (
      <div className='movie'>
        <h3 className='my-4'>Please see out movies</h3>
        <div className='row'>
          <div className='col-3'>
            <ListGroup genres={genres} onGenreChange={this.handleGenreChange} currentGenre={currentGenre} />
          </div>
          <div className='col'>
            <p>
              Showing {(currentGenre === '' || currentGenre === 'AllMovies' ? movieArrToMap : genresArr).length} movies
              on this page.
            </p>
            <table className='table table-striped '>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(currentGenre === '' || currentGenre === 'AllMovies' ? movieArrToMap : genresArr).map((movie) => (
                  <MovieRow onDelete={this.handleDelete} movie={movie} key={movie._id} />
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
              itemCount={mv.length}
              pageSize={this.state.pageSize}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieTable;
