import React, { useEffect, useState } from "react";
import TextField from "../textField";
import { validator } from "../../utils/validator";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const validatorConfig = {
    email: {
      isRequired: { message: "Email must be provided" },
      isEmail: { message: "Email entered incorrectly" },
    },
    password: {
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
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
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
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4 rounded-4">
          <h3 className="mb-4">Login</h3>
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
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
