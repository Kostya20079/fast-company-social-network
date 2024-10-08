import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  defaultOption = "Choose...",
  error,
}) => {
  const handleChange = ({ target }) => {
    // sending data to state
    onChange({ name: target.name, value: target.value });
  };
  const getInputStatus = () => {
    return `form-select ${error ? "is-invalid" : ""}`;
  };
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputStatus()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {options &&
          options.map((option) => (
            <option value={option._id} key={option._id}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
};

export default SelectField;
