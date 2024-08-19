import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader />
          <TableBody />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Table;
