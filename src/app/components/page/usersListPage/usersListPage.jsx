import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import paginate from "../../../utils/paginate";
import api from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 3; // size of showing users on page

  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handleProfessionSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedProf(item);
  };

  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  //change to selected page
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  //sorts items by click on elements of usersTable
  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = searchQuery
      ? users.filter(
          (user) =>
            user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : selectedProf
      ? users.filter((user) => {
          return (
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          );
        })
      : users;

    const count = filteredUsers.length; // count of users
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]); //sorts by special order
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              selectedItem={selectedProf}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              {" "}
              Clear
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <div class="input-group mb-3">
            <input
              type="text"
              name="searchQuery"
              className="form-control"
              placeholder="Search..."
              aria-describedby="basic-addon1"
              onChange={handleSearchQuery}
              value={searchQuery}
            />
          </div>

          {count > 0 && (
            <UserTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return <div className="loading">Loading...</div>;
};

export default UsersListPage;
