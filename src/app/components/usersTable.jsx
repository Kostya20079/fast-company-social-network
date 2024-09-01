import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const UserTable = ({
  users,
  onSort,
  onToggleBookMark,
  onDelete,
  selectedSort,
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Name",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
    },
    qualities: {
      name: "Qualities",
      component: (user) => <QualitiesList qualities={user.qualities} />,
    },
    professions: { path: "profession.name", name: "Professions" },
    meetings: { path: "completedMeetings", name: "Meetings" },
    rate: { path: "rate", name: "Rate" },
    bookmark: {
      path: "bookmark",
      name: "Favorites",
      component: (user) => (
        <BookMark
          status={user.bookmark}
          onClick={() => onToggleBookMark(user._id)}
        />
      ),
    },
    delete: {
      component: (user) => (
        <button onClick={() => onDelete(user._id)} className="btn btn-danger">
          Delete
        </button>
      ),
    },
  };

  return (
    <>
      <Table>
        <TableHeader {...{ onSort, selectedSort, columns }} />
        <TableBody {...{ data: users, columns }} />
      </Table>
    </>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserTable;
