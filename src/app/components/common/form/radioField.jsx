import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ label, name, value, onChange, options }) => {
  const handleChange = ({ target }) => {
    // sending data to state
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-3">
      <label className="form-label me-3">{label}</label>
      <div>
        {options.map((option) => (
          <div
            className="form-check form-check-inline"
            key={option.name + "_" + option.value}
          >
            <input
              className="form-check-input"
              name={name}
              type="checkbox"
              id={option.name + "_" + option.value}
              value={option.value}
              checked={option.value === value}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor={option.name + "_" + option.value}
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

RadioField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  error: PropTypes.string,
};

export default RadioField;
