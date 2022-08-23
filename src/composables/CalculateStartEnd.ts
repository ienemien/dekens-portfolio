export function useCalculateStartEnd(
  pageNumber: number,
  totalPages: number,
  totalProjects: number
) {
  const start = (pageNumber - 1) * 9;
  const end = pageNumber === totalPages ? totalProjects : pageNumber * 9;

  return { start, end };
}
