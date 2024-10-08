import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type = "text", name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = ({ target }) => {
    // sending data to state
    onChange({ name: target.name, value: target.value });
  };
  const getInputStatus = () => {
    // validation checking styles
    return `form-control ${error ? "is-invalid" : ""}`;
  };
  const toggleShowPassword = () => {
    // showing password
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="mb-3 input-group">
      <label htmlFor={name}>{label}</label>
      <div className="input-group ">
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={`${getInputStatus()}`}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary rounded-end-2"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={"bi bi-eye" + (!showPassword ? "-slash" : "")}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default TextField;
