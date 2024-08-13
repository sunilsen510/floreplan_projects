import React from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalRecord: number;
  limit: number;
}

const CustomPagination: React.FC<Props> = ({ page, setPage, totalRecord, limit }) => {
  const totalPages = Math.ceil(totalRecord / limit);
  
  return (
    <>
      {totalPages > 1 && (
        <PaginationControl
          page={page}
          between={4}
          total={totalRecord}
          limit={limit}
          changePage={(page) => {
            setPage(page);
          }}
          ellipsis={1}
        />
      )}
    </>
  );
};

export default CustomPagination;

