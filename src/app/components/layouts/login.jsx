import React, { useState } from "react";
import LoginForm from "../ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../ui/registerForm";
const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4 rounded-4">
          {formType === "register" ? (
            <>
              <h3 className="mb-2">Register</h3> <RegisterForm />{" "}
              <p className="mt-2">
                Already have account?{" "}
                <a className="btn-link" role="button" onClick={toggleFormType}>
                  Sign In
                </a>
              </p>{" "}
            </>
          ) : (
            <>
              <h3 className="mb-2">Login</h3> <LoginForm />{" "}
              <p className="mt-2">
                Don't have account?{" "}
                <a className="btn-link" role="button" onClick={toggleFormType}>
                  Sign Up
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
