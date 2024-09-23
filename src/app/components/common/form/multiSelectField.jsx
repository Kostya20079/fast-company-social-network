import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((option) => ({
          value: options[option]._id,
          label: options[option].name,
        }))
      : options;

  const handleChange = (value) => {
    onChange({ name: name, value }); // sending data to state
  };

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default MultiSelectField;
