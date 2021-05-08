import React, { Component, useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { navigate } from "@reach/router";
import { userContext } from "../usercontext";
import { useDispatch } from "react-redux";
import { accesstoken } from "../state/user";
import { UserContext } from "../App";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    switch (name) {
      case "email":
        email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      default:
        break;
    }
  };

  return (
    <div className="root-container">
      <div className="box-container login">
        <div className="inner-container">
          <div className="header">Reset Password</div>
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
              {email && (
                <small className="danger-error">{email}</small>
              )}
            </div>

            <button type="button" className="login-btn" >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
