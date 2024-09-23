import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const handleChange = () => {
    // sending data to state
    onChange({ name: name, value: !value });
  };
  const getInputStatus = () => {
    // validation checking styles
    return `form-check-input ${error ? "is-invalid" : ""}`;
  };
  return (
    <div className="mb-2">
      <div className="form-check">
        <input
          className={getInputStatus()}
          name={name}
          type="checkbox"
          value=""
          id={name}
          onChange={handleChange}
          checked={value}
        />
        <label className="form-check-label" htmlFor={name}>
          {children}
        </label>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  error: PropTypes.string,
};

export default CheckBoxField;
