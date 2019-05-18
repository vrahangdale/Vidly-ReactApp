import React from "react";
import _ from "lodash";
// sfc

const Pagination = props => {
  const { items, pageSize, onPageChange, currentPage } = props;
  let pageCount = Math.ceil(items / pageSize);
  if (pageCount === 1) pageCount = null;
  let pages = _.range(1, pageCount + 1);
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
