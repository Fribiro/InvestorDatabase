import React, { Component, useState, useContext } from "react";
//import {BrowserRouter as Link} from 'react-router-dom'
import PersonalDetails from "./PersonalDetails";
import BusinessDetails from "./BusinessDetails";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import {useSelector} from  "react-redux";
import {selectUser} from "../../state/user"
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";

const Profile = () => {
  const [visible, setVisible] = useState(true);
  // const {user} = useContext(userContext);
  const [sampleFile, setSampleFile] = useState(null);
  const user = useSelector(selectUser);
      if (!user.accesstoken) {
        return <Redirect from='' to='login' noThrow />
      }


    const fileChangedHandler = (e) => {
      sampleFile({ sampleFile: e.target.files[0] });
      console.log(e.target.files[0])
    };

    const uploadHandler = () => {
      const fileInput = document.getElementById('imageInput');
      fileInput.click();

      // const fd = new FormData();
      // fd.append('image', sampleFile, sampleFile.name)
      Axios.put("http://localhost:5500/imageupload").then((res) => {
        console.log(res);
        if (res.data.results) {
          console.log(res);
          res.send("Profile picture updated successfully");
        } else {
          res.send("Profile picture update failed");
        }
      });
    };
    
      return (
        <div>
          <Header />
          <div className="userProfile">
            <div className="profileNav row">
              <div className="userHeader">
                <img
                  className="rounded-circle z-depth-2"
                  src="/img/user1.jpg"
                  alt=""
                />
                {/* <Avatar size={100} /> */}
                <input
                  id="imageInput"
                  hidden="hidden"
                  type="file"
                  name="sampleFile"
                  accept="image/*"
                  onChange={fileChangedHandler}
                />
                <Tooltip title="Edit profile picture" placement="top">
                  <IconButton htmlFor="imageInput" onClick={uploadHandler}>
                    <EditIcon style={{ color: "#3DB2C7" }} />
                  </IconButton>
                </Tooltip>
                {/* <button onClick={uploadHandler}>Upload!</button> */}
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
