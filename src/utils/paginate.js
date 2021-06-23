export function paginate(items, pageNum, pageSize) {
  const startPosition = pageNum * pageSize - pageSize;
  return items.slice(startPosition, startPosition + pageSize);
}

export function sortGenres(movies, genre) {
  return movies.filter((movie) => movie.genre.name === genre);
}
