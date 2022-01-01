import React from "react";
import _ from "lodash";

const Pagination = ({ itemsCount, currentPage, pageSize, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <p className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;