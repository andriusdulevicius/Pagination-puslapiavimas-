//stateless functional component
//Pagination- puslapiavimas (pvz prekiu ar kazko)

const Pagination = (props) => {
  const { itemCount, pageSize } = props;
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount === 1) return null;

  const pages = () => {
    const arr = [];
    for (let i = 1; i <= pageCount; i++) {
      arr.push(i);
    }
    return arr;
  };

  console.log(pages());

  return (
    <nav>
      <ul className='pagination'>
        {pages().map((p) => {
          return (
            <li key={p} className='page-item'>
              <a href='/' className='page-link'>
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
