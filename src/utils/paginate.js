export function paginate(items, pageNum, pageSize) {
  const startPosition = pageNum * pageSize - pageSize;
  return items.slice(startPosition, startPosition + pageSize);
}
