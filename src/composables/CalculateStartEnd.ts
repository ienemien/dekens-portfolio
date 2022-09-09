export function useCalculateStartEnd(
  pageNumber: number,
  totalPages: number,
  totalProjects: number,
  perPage?: number
) {
  const PER_PAGE = perPage ?? 9;
  const start = (pageNumber - 1) * PER_PAGE;
  const end = pageNumber === totalPages ? totalProjects : pageNumber * PER_PAGE;

  return { start, end };
}
