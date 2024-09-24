import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../page/userPage";
import UsersListPage from "../page/usersListPage";
import EditUserDataPage from "../page/editUserDataPage/editUserDataPage";

const Users = () => {
  const { userId, edit } = useParams();

  return (
    <>
      {userId ? (
        edit ? (
          <EditUserDataPage />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  );
};
export default Users;
