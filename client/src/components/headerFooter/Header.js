import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
//import SearchIcon from "@material-ui/icons/Search";
import { UserContext } from "../../App";

import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const [redirect, setRedirect] = useState("");
  const [searchText, setSearchText] = useState("");
  //const excludeColumns = ["id", "color"];
  //const [user, setUser] = useState([]);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const logOutCallback = async () => {
    await fetch("http://localhost:5000/api/logout", {
      method: "POST",
    });
    localStorage.clear();
    //create user from context
    setUser({});
    //navigate back to the home page
    console.log("Logged out");
    setRedirect("/");
  };

  const handleChange = (value) => {
    setSearchText(value);
  };

  // if (redirect) {
  //   return <Redirect to={redirect} />;
  // }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            EkezaKenya
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="about">
                  About
                </Link>
              </li>
              {!user.accesstoken ? (
                <li className="nav-item">
                  <Link className="nav-link" to="investor">
                    Investors
                  </Link>
                </li>
              ) : null}
              {!user.accesstoken ? (
                <li className="nav-item">
                  <Link className="nav-link" to="entrepreneur">
                    Entrepreneurs
                  </Link>
                </li>
              ) : null}
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Contacts
                </Link>
              </li>
              {user.accesstoken ? (
                <li className="nav-item">
                  <Link className="nav-link" to="InvestorCards">
                    Investors
                  </Link>
                </li>
              ) : null}
              {user.accesstoken ? (
                <li className="nav-item">
                  <Link className="nav-link" to="EntrepreneurCards">
                    Entrepreneurs
                  </Link>
                </li>
              ) : null}
              {!user.accesstoken ? (
                <div style={{ display: "flex" }}>
                  <li className="nav-item">
                    <Link className="nav-link" to="signup">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                </div>
              ) : null}
              {/* {!user.accesstoken ? (
                <div class="searchBox">
                  <input class="searchInput"type="text" name="" placeholder="Search"/>
                  <button class="searchButton" href="#">
                      <SearchIcon class="material-icons"/>
                  </button>
                </div>
              ) : null} */}
              
              {(user.accesstoken && (localUser.UserRole == 2 )) ? (
                <li>
                  <Link className="nav-link" to="investor-profile">
                    <Avatar
                      icon="user"
                      style={{ height: "30px", width: "30px" }}
                    />
                  </Link>
                </li>
              ) : null}
              {(user.accesstoken && (localUser.UserRole == 3)) ? (
                <li>
                  <Link className="nav-link" to="entrepreneur-profile">
                    <Avatar
                      icon="user"
                      style={{ height: "30px", width: "30px" }}
                    />
                  </Link>
                </li>
              ) : null}
              {user.accesstoken ? (
                <li>
                  <Link className="nav-link" to="" onClick={logOutCallback}>
                    Logout
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
