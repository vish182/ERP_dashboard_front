import React, { useState } from "react";
// import Layout from "../core/Layout";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import {signin, authenticate, isAuthenticated} from '../auth';

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    errorMessage: "",
    loading: false,
    redirectToReferrer: false,
  });

  //   const { user } = isAuthenticated();
  const { login } = useAuth();

  const history = useHistory();

  const { email, password, error, loading, errorMessage } = values;

  const handleChange = (fieldName) => {
    // higher order function
    return (event) => {
      setValues({ ...values, [fieldName]: event.target.value });
    };
  };

  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    try {
      let loginobj = await login({ email: email, password: password });

      //console.log("objlogin: ", loginobj);
      if (!loginobj) {
        alert("Wrong Password");
        throw "Login Failed";
      }

      history.push("/");
    } catch (err) {
      setValues({
        ...values,
        error: true,
        errorMessage: err ? err : "failed",
        loading: false,
      });

      alert(`Failed to log in: ${err}`);
    }
  };

  const signInForm = () => {
    return (
      <form>
        <div className="form-group ml-5 mt-5">
          <h1> Sign-In</h1>
          <label className="text-muted">Email</label>
          <input
            value={email}
            onChange={handleChange("email")}
            className="form-control w-25"
            type="email"
          />
        </div>

        <div className="form-group ml-5">
          <label className="text-muted">Password</label>
          <input
            value={password}
            onChange={handleChange("password")}
            className="form-control w-25"
            type="password"
          />
        </div>

        <button onClick={clickSubmit} className="btn btn-primary ml-5">
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
        {" "}
        {errorMessage}{" "}
      </div>
    );
  };

  const showLoading = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: loading ? "" : "none" }}
      >
        {" "}
        Loading ... <Link to="/signin">Sign-in</Link>
      </div>
    );
  };

  const redirectUser = () => {
    // if (redirectToReferrer) {
    //   if (user && user.role === 1) {
    //     return <Redirect to="/admin/dashboard" />;
    //   } else {
    //     return <Redirect to="user/dashboard" />;
    //   }
    // }
  };

  return (
    <div>
      {showError()}
      {showLoading()}
      {signInForm()}
      {redirectUser()}
      {/* {JSON.stringify(values)} */}
    </div>
  );
};

export default Signin;
