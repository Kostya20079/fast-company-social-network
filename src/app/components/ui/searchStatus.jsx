import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    if (number > 1) {
      return "people will hang out ";
    } else {
      return "person will hang out ";
    }
  };
  return (
    <h2>
      <span className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}>
        {length > 0
          ? `${length + " " + renderPhrase(length)} with you today`
          : "No one will hang out with you today"}
      </span>
    </h2>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
};

export default SearchStatus;
