import PropTypes from 'prop-types';

const ListGroup = (props) => {
  const { genres, onGenreChange, currentGenre } = props;
  return (
    <ul className='list-group b'>
      <li
        className={'list-group-item ' + (currentGenre === 'AllMovies' && 'active')}
        onClick={() => onGenreChange('AllMovies')}
      >
        Get all movies
      </li>
      {genres.map((g) => (
        <li
          onClick={() => onGenreChange(g.name)}
          key={g._id}
          className={'list-group-item ' + (g.name === currentGenre && 'active')}
        >
          {g.name}
        </li>
      ))}
    </ul>
  );
};

ListGroup.propTypes = {
  genres: PropTypes.array.isRequired,
  onGernreChange: PropTypes.func,
  currentGenre: PropTypes.string.isRequired,
};

export default ListGroup;
