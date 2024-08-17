import React from 'react';
import { generatePageNumbers } from '../utils/helpers';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };
  
  const pageNumbers = generatePageNumbers(currentPage,totalPages);

  return (
    <div className="flex justify-center mt-6 space-x-1 flex-wrap">
    <button
      onClick={() => handlePageClick(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-2 sm:px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    >
      Previous
    </button>
    {pageNumbers.map((page, index) =>
      typeof page === 'number' ? (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          className={`px-2 sm:px-4 py-2 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="px-2 sm:px-4 py-2">
          {page}
        </span>
      )
    )}
    <button
      onClick={() => handlePageClick(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-2 sm:px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>  );
};

export default Pagination;