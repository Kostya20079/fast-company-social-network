import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import API from "../../../api";
import Qualities from "../../ui/qualities";

const UserPage = ({ userId }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  useEffect(() => {
    API.users.getById(userId).then((data) => setUserData(data));
  });

  if (userData) {
    return (
      <>
        <h1 style={{ color: "green" }}>{userData.name}</h1>
        <h2 style={{ color: "blue" }}>
          Profession: {userData.profession.name}
        </h2>
        <Qualities qualities={userData.qualities} />
        <p>Meetings: {userData.completedMeetings}</p>
        <p style={{ color: "red" }}>Rate: {userData.rate} / 5</p>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => navigate(-1)}
        >
          Back
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
