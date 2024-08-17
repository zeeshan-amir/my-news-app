import { newsApiCategory, nyCategories } from "./categories";

export const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
): (number | string)[] => {
  const pageNumbers = [];
  const pageOffset = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage - pageOffset, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push('...');
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};

export const newsApiSelectOptions = newsApiCategory.map(x => {
  return {
    label: x,
    value: x,
  };
});

export const newYorkselectOptions = nyCategories.map(category => {
  return {
    label: category,
    value: category,
  };
});