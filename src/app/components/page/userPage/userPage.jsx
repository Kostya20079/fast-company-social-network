import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";

const UserPage = ({ userId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUserData(data));
  }, []);
  const handlePageChange = () => {
    const currentPath = location.pathname;
    navigate(`${currentPath}/edit`);
  };

  if (userData) {
    return (
      <>
        <h1 style={{ color: "green" }}>{userData.name}</h1>
        <p>Profession: {userData.profession.name}</p>
        <p>Gender: {userData.sex}</p>
        <Qualities qualities={userData.qualities} />
        <p>Meetings: {userData.completedMeetings}</p>
        <p style={{ color: userData.rate > 3 ? "green" : "red" }}>
          Rate: {userData.rate} / 5
        </p>
        <button
          type="button"
          className="btn btn-success me-2"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={handlePageChange}
        >
          Edit
        </button>
      </>
    );
  } else {
    return <div className="loading">Loading...</div>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;
