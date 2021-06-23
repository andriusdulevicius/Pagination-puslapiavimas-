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
    pageSize: 3,
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

  handleChangePageSize = (number) => {
    this.setState({ pageSize: number });
  };

  generateMovies = () => {
    const { movies: mv, currentPage, pageSize, currentGenre } = this.state;
    const movieArrToMap = paginate(mv, currentPage, pageSize);
    const genresArr = sortGenres(mv, currentGenre);
    if (this.state.currentGenre === '' || this.state.currentGenre === 'AllMovies') {
      return movieArrToMap.map((movie) => <MovieRow onDelete={this.handleDelete} movie={movie} key={movie._id} />);
    } else {
      return genresArr.map((movie) => <MovieRow onDelete={this.handleDelete} movie={movie} key={movie._id} />);
    }
  };

  render() {
    const { movies: mv, currentPage, pageSize, currentGenre, genres } = this.state;
    if (mv.length === 0) return <div className='alert alert-warning'>There are no movies at the moment</div>;

    //paduoti tik tiek movies kiek reikia pagal pagination
    const genresArr = sortGenres(mv, currentGenre);
    const movieArrToMap = paginate(mv, currentPage, pageSize);
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
              <tbody>{this.generateMovies()}</tbody>
            </table>

            {
              <Pagination
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
                itemCount={mv.length}
                sortedCount={genresArr.length}
                pageSize={this.state.pageSize}
                onChangePageSize={this.handleChangePageSize}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default MovieTable;
