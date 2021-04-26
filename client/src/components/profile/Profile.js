import React, { Component, useState, useContext } from "react";
//import {BrowserRouter as Link} from 'react-router-dom'
import PersonalDetails from "./PersonalDetails";
import BusinessDetails from "./BusinessDetails";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import { UserContext } from "../../App";

const Profile = () => {
  const [visible, setVisible] = useState(true);
  const [user] = useContext(UserContext);
    
      if (!user.accesstoken) {
        return <Redirect from='' to='login' noThrow />
      }
    
      return (
        <div>
          <Header/>
          <div className="userProfile">
            <div className="profileNav row">
              <div className="userHeader">
                <img src="/img/user1.jpg" alt="" />
              </div>
              <div className="userNav">
                <ul className="sideheaders">
                  <li>Username</li>
                  <li
                    className="profileNavClickable"
                    onClick={() => {
                      setVisible({ visible: true });
                    }}
                  >
                    Profile
                  </li>
                  <li
                    className="profileNavClickable"
                    onClick={() => {
                      setVisible({ visible: false });
                    }}
                  >
                    Business Profile
                  </li>
                  <li>Location</li>
                  <li>Email</li>
                </ul>
              </div>
            </div>

            <div className="profileDetails">
              {visible ? <PersonalDetails /> : null}
              {!visible ? <BusinessDetails /> : null}
            </div>
          </div>
          <Footer />
        </div>
      );
};
export default Profile;
