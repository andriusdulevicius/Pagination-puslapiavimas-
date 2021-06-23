//stateless functional component
//Pagination- puslapiavimas (pvz prekiu ar kazko)

import PropTypes from 'prop-types';

const Pagination = (props) => {
  const { itemCount, onChangePageSize, sortedCount, pageSize, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(itemCount / pageSize);
  const sortedGenresCount = Math.ceil(sortedCount / pageSize);

  if (pageCount === 1 || sortedGenresCount === 1) return null;

  const pages = () => {
    const arr = [];
    for (let i = 1; i <= pageCount; i++) {
      arr.push(i);
    }
    return arr;
  };

  return (
    <nav>
      <ul className='pagination'>
        {pages().map((p) => {
          return (
            <li key={p} className={'page-item' + (currentPage === p && ' active')}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a onClick={() => onPageChange(p)} className='page-link'>
                {p}
              </a>
            </li>
          );
        })}
      </ul>
      <label htmlFor='movies' className='pr-2'>
        Choose how many movies to show on page:
      </label>

      <select name='movies' id='movies' onChange={(e) => onChangePageSize(+e.target.value)}>
        <option value='3'>3</option>
        <option value='5'>5</option>
        <option value='8'>8</option>
      </select>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
