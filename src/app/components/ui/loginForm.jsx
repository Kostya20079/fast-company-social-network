import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  let validateSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password must be provided")
      .matches(
        /(?=.*[A-Z])/,
        "The password must contain at least 1 capital letter"
      )
      .matches(/(?=.*[0-9])/, "The password must contain at least 1 digit")
      .matches(/(?=.{8,})/, "The password must contain at least 8 characters"),
    email: yup
      .string()
      .required("Email must be provided")
      .email("Email entered incorrectly"),
  });
  //   email: {
  //     isRequired: { message: "Email must be provided" },
  //     isEmail: { message: "Email entered incorrectly" },
  //   },
  //   password: {
  //     isRequired: { message: "Password must be provided" },
  //     isCapitalSymbol: {
  //       message: "The password must contain at least 1 capital letter",
  //     },
  //     isContainDigit: {
  //       message: "The password must contain at least 1 digit",
  //     },
  //     min: {
  //       message: "The password must contain at least 8 characters",
  //       value: 8,
  //     },
  //   },
  // };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    validateSchema
      .validate(data) //(data, {abortEarly: false}) all errors in one time
      .then(() => {
        setErrors({});
      })
      .catch((error) => {
        setErrors({ [error.path]: error.message });
      });
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
      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Stay logged in
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

export default LoginForm;
