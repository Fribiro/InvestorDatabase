import React, { useState,useEffect } from "react";
import Axios from "axios";

const ResetPassword = () => {
  const [formErrors, setFormErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let error;
    switch (name) {
      case "password":
        error = value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }
    setFormErrors({ [name]: error });
  };

  const resetPassword = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5500/resetPassword/:id/:token", {
      password,
    }).then(
      (res) => {
        if (res.status === 201) {
          console.log(res.data.password);
        }
      },
      (err) => {
        setMessage(err.response.data.message);
      }
    );
  };

  useEffect(() => {
    Axios.get("http://localhost:5500/resetPassword/:id/:token", {
      password,
    }).then(
      (res) => {
        if (res.status === 201) {
          console.log(res.data.password);
        }
      },
      (err) => {
        setMessage(err.response.data.message);
      }
    );
  }, []);

  return (
    <div className="root-container">
      <div className="box-container login">
        <div className="inner-container">
          <div className="header">Reset Password</div>
          <div className="box">
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                className={formErrors.password ? "error" : null}
                placeholder="Password"
                onChange={(e) => {
                  handleChange(e);
                  setPassword(e.target.value);
                }}
              />
              {formErrors.password && (
                <small className="danger-error">{formErrors.password}</small>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm assword"
                onChange={(e) => {
                  handleChange(e);
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>

            {message && <small className="danger-error">{message}</small>}
            <button type="button" className="login-btn" onClick={resetPassword}>
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
