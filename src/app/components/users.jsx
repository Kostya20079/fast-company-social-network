import React, { useState } from "react";
import Pagination from "./pagination";
import User from "./user";
import paginate from "../utils/paginate";
import PropTypes from "prop-types";

const Users = ({ users, ...rest }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const usersCrop = paginate(users, currentPage, pageSize);
  return (
    <>
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Qualities</th>
              <th scope="col">Profession</th>
              <th scope="col">Meetings</th>
              <th scope="col">Grade</th>
              <th scope="col">Favorites</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {usersCrop.map((user) => (
              <User key={user._id} {...rest} {...user} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Users;
