import React, { useState } from "react";
//import Axios from "axios";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const PasswordForget = () => {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
                className={email ? "error" : null}
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

            <button type="button" className="login-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordForget;
