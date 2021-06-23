//stateless functional component
//Pagination- puslapiavimas (pvz prekiu ar kazko)

const Pagination = (props) => {
  const { itemCount, pageSize, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(itemCount / pageSize);

  console.log(currentPage, 'current');

  if (pageCount === 1) return null;

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
    </nav>
  );
};

export default Pagination;
