import React, { Component, useState, useContext,useEffect } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { navigate } from "@reach/router";
import {userContext} from "../usercontext"
import {useDispatch} from 'react-redux'
import { accesstoken } from '../state/user'
import { UserContext } from "../App";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid
};

const Login = () => {
  //const {handleUserChange, user} = useContext(userContext)
  const [user, setUser] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
let error;
    switch (name) {
      case "email":
          error= emailRegex.test(value)
          ? ""
          : "invalid email address"
        break;
      case "password":
           error= value.length < 6 ? "minimum 6 characaters required" : ""
        break;
      default:
        break;
    }
    setFormErrors({ [name]: error });
    // setEmail({ email, [name]: value });
    // setPassword({ password, [name]: value });
  };

  const submitLogin = (e) => {
  
    const result = Axios.post("http://localhost:5500/auth/login", {
      email,
     password,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setUser({
        accesstoken: res.data.accesstoken,
        
      });
        //dispatch(accesstoken(res.data.accesstoken));
        setRedirect("/profile");
        console.log("Logged in");
    },(err)=>{
      setMessage(err.response.data.message);
      
       //dispatch(userSet(null));
    });
  };
  useEffect(() => {
    console.log(user);
  }, [user]);
    
    if (redirect) {
      return <Redirect to={redirect} />;
    }else    return (
      <div className="root-container">
        <div className="box-container login">
          <div className="inner-container">
            <div className="header">Login</div>
            <div className="box">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  className={formErrors.email ? "error" : null}
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

              {message && <small className="danger-error">{message}</small>}
              <button type="button" className="login-btn" onClick={submitLogin}>
                Login
              </button>
              <small className="text-right">
                <Link to="/resetpassword" style={{color: '#3DB2C7'}}>Forgot password</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default Login
