import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../App";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState("");
  const [formErrors, setFormErrors] = useState({
    UserEmail: "",
    UserPassword: "",
  });
  const [UserEmail, setUserEmail] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [storedUser, setStoredUser] = useState(localStorage.getItem("user"));

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let error;
    switch (name) {
      case "UserEmail":
        error = emailRegex.test(value) ? "" : "invalid email address";
        break;
      case "UserPassword":
        error = value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }
    setFormErrors({ [name]: error });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:5000/api/login`, {
      UserEmail,
      UserPassword,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      (res) => {
        console.log(res)
        const { accesstoken, userId, role } = res.data;
        const userData = {
          accesstoken: accesstoken,
          UserRole: role,
          UserId: userId
        }
        console.log(userData);
        debugger;

        if (res.data.role === 1) {
          localStorage.setItem("user", JSON.stringify(userData));
          setStoredUser(storedUser);
          const localUser = JSON.parse(localStorage.getItem("user"));
          setUser({
            accesstoken: localUser.accesstoken,
          });
          console.log(user);
          setRedirect("/admin-dashboard");

        }
        if (res.data.role === 2) {
          localStorage.setItem("user", JSON.stringify(userData));
          setStoredUser(storedUser);
          const localUser = JSON.parse(localStorage.getItem("user"));
          setUser({
            accesstoken: localUser.accesstoken,
          });
          console.log(user);
          setRedirect("/InvViewProfile");
        }
        if (res.data.role === 3) {
          console.log('hello');
          
          localStorage.setItem("user", JSON.stringify(userData));
          setStoredUser(storedUser);
          const localUser = JSON.parse(localStorage.getItem("user"));
          setUser({
            accesstoken: localUser.accesstoken,
          });
          console.log(user);
          setRedirect("/EntViewProfile");
        }

        if (res.data.error) {
          setMessage(res.data.error);
        }
      },
      // (err) => {
      //   setMessage(err.response.data.message);

      //   //dispatch(userSet(null));
      // }
    );
  };
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  if (redirect) {
    return <Redirect to={redirect} />;
  } else
    return (
      <div className="root-container">
        <div
          className="box-container login"
          style={{ marginTop: "0 !important" }}
        >
          <div className="inner-container">
            <div className="header">Login</div>
            <div className="box">
              <div className="input-group">
                <label htmlFor="UserEmail">Email</label>
                <input
                  type="text"
                  name="UserEmail"
                  value={UserEmail}
                  className={formErrors.UserEmail ? "error" : null}
                  placeholder="Email"
                  onChange={(e) => {
                    handleChange(e);
                    setUserEmail(e.target.value);
                  }}
                />
                {formErrors.UserEmail && (
                  <small className="danger-error">{formErrors.UserEmail}</small>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="UserPassword">Password</label>
                <input
                  type="password"
                  name="UserPassword"
                  value={UserPassword}
                  className={formErrors.UserPassword ? "error" : null}
                  placeholder="Password"
                  onChange={(e) => {
                    handleChange(e);
                    setUserPassword(e.target.value);
                  }}
                />
                {formErrors.UserPassword && (
                  <small className="danger-error">{formErrors.UserPassword}</small>
                )}
              </div>

              {message && <small className="danger-error">{message}</small>}
              <button type="button" className="login-btn" onClick={submitLogin}>
                Login
              </button>
              <small className="text-right">
                <Link to="/forgotpassword" style={{ color: "#3DB2C7" }}>
                  Forgot password
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;
