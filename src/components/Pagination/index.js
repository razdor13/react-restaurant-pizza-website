import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';


const Pagination = ({totalPages,onChangePage,currentPage}) => {
    console.log(currentPage)
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected)}
      pageRangeDisplayed={4}
      pageCount={totalPages}
      forcePage={currentPage}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;