import { useMemo } from 'react';

const PAGES_OFFSET = 2;

const range = (start, end): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export function usePagination(currentPage: number, pageCount: number): Array<number | string> {
  return useMemo((): Array<number | string> => {
    // 1 - the current page
    // PAGES_OFFSET * 2 - page buttons in both sides of the current page
    // 4 - the first and the last pages + 2 dot buttons
    const visibleButtonMaxCount = 1 + PAGES_OFFSET * 2 + 4;

    if (pageCount <= visibleButtonMaxCount) {
      return range(1, pageCount);
    }

    let from = currentPage - PAGES_OFFSET;
    let to = currentPage + PAGES_OFFSET;

    // prevent out of range
    if (from < 1) {
      // 1 - "zero" page
      const outOfRange = Math.abs(from) + 1;

      from = 1;
      to = Math.min(to + outOfRange, pageCount);
    }

    if (to > pageCount) {
      const outOfRange = to - pageCount;

      from = Math.max(from - outOfRange, 1);
      to = pageCount;
    }

    // the distance from the first button to the first button in range
    const startDistance = from - 1;
    // the distance from the last button to the last button in range
    const endDistance = pageCount - to;

    // "2" is the first and a dots buttons
    if (startDistance <= 2) {
      to += 2 - startDistance;
    }

    // "2" is the last and a dots buttons
    if (endDistance <= 2) {
      from -= 2 - endDistance;
    }

    let pages: Array<number | string> = range(from, to);

    // add the first and a dots buttons
    if (startDistance > 0) {
      switch (startDistance) {
        case 1:
          pages = [1, ...pages];

          break;
        case 2:
          pages = [1, 2, ...pages];

          break;
        default:
          pages = [1, 'start ellipsis', ...pages];

          break;
      }
    }

    // add the last and a dots buttons
    if (endDistance > 0) {
      switch (endDistance) {
        case 1:
          pages = [...pages, pageCount];

          break;
        case 2:
          pages = [...pages, pageCount - 1, pageCount];

          break;
        default:
          pages = [...pages, 'end ellipsis', pageCount];

          break;
      }
    }

    return pages;
  }, [currentPage, pageCount]);
}
