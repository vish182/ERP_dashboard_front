import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    success: false,
    error: undefined,
  });

  const { signup, currentUser } = useAuth();

  const { email, password, success, error } = values;

  const history = useHistory();

  const handleChange = (fieldName) => {
    // higher order function
    return (event) => {
      setValues({ ...values, [fieldName]: event.target.value });
    };
  };

  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    try {
      await signup({
        email: email,
        password: password,
      });

      history.push("/dashboard");
    } catch (err) {
      alert("Failed to create an account", err);
      console.log(err);
    }
  };

  const signUpForm = () => {
    return (
      <form className="ml-5 mt-5">
        {/* <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            value={name}
            onChange={handleChange("name")}
            className="form-control  w-50"
            type="text"
          />
        </div> */}

        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            value={email}
            onChange={handleChange("email")}
            className="form-control  w-50"
            type="email"
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            value={password}
            onChange={handleChange("password")}
            className="form-control  w-50"
            type="password"
          />
        </div>

        {/* <div className="form-group">
          <label className="text-muted">Phone no</label>
          <input
            value={phone}
            onChange={handleChange("phone")}
            className="form-control  w-50"
            type="tel"
            pattern="[0-9]{10}"
          />
        </div> */}

        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {"error "}
        {error}{" "}
      </div>
    );
  };

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        {" "}
        New account create. Please <Link to="/signin">Sign-in</Link>
      </div>
    );
  };

  return (
    <div>
      {JSON.stringify(currentUser)}
      {showError()}
      {showSuccess()}
      {signUpForm()}
      {JSON.stringify(values)}
    </div>
  );
};

export default Signup;
