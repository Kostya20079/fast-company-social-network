import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false,
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfession] = useState([]);
  const [qualities, setQualities] = useState({});
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data)); //get all professions
    api.qualities.fetchAll().then((data) => setQualities(data)); //get all qualities
  }, []);
  const handleChange = (target) => {
    //! adding form data
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const validatorConfig = {
    // set the configuration for the validation
    email: {
      // settings for email field
      isRequired: { message: "Email must be provided" },
      isEmail: { message: "Email entered incorrectly" },
    },
    password: {
      // settings for password field
      isRequired: { message: "Password must be provided" },
      isCapitalSymbol: {
        message: "The password must contain at least 1 capital letter",
      },
      isContainDigit: {
        message: "The password must contain at least 1 digit",
      },
      min: {
        message: "The password must contain at least 8 characters",
        value: 8,
      },
    },
    profession: {
      // settings for professions field
      isRequired: { message: "Profession must be selected" },
    },
    license: {
      // settings for license field
      isRequired: {
        message: "You can not use this software without the license agreement",
      },
    },
  };

  useEffect(() => {
    // validation check
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig); // sending data and configuring for error checking
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email Address"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Choose your profession"
        name="profession"
        value={data.profession}
        onChange={handleChange}
        options={professions}
        error={errors.profession}
      />
      <RadioField
        label="Choose your gender"
        name="sex"
        value={data.sex}
        onChange={handleChange}
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" },
        ]}
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        defaultValue = {data.qualities}
        name="qualities"
        label="Choose your qualities"
      />
      <CheckBoxField
        name="license"
        value={data.license}
        onChange={handleChange}
        error={errors.license}
      >
        Confirm{" "}
        <a className="btn-link" style={{ cursor: "pointer" }}>
          the license agreement
        </a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
