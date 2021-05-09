import React, { useState } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const PasswordForget = () => {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
  });
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let error;
    switch (name) {
      case "email":
        error = emailRegex.test(value) ? "" : "Invalid email address";
        break;
      default:
        break;
    }
    setFormErrors({ [name]: error });
  };

  const forgotPassword = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5500/forgotPassword", {
      email,
    }).then((res) => {
        if (res.status === 201) {
          console.log(res.data.link)
          setRedirect('/resetpassword');
        }
      },(err) => {
        setMessage(err.response.data.message);
      }
    );
  };

  if (redirect) {
      return <Redirect to={redirect} />;
  }

  return (
    <div className="root-container">
      <div className="box-container login">
        <div className="inner-container">
          <div className="header">Forgot Password</div>
          <div className="box">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  handleChange(e);
                  setEmail(e.target.value);
                }}
              />
              {formErrors.email && (
                <small className="danger-error">{formErrors.email}</small>
              )}
            </div>
            {message && <small className="danger-error">{message}</small>}
            <button
              type="button"
              className="login-btn"
              onClick={forgotPassword}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordForget;
