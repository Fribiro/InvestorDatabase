import React, { useState, useContext, useEffect } from "react";
//import {BrowserRouter as Link} from 'react-router-dom'
import PersonalDetails from "./PersonalDetails";
import BusinessDetails from "./BusinessDetails";
import Header from "../../components/headerFooter/Header";
import Footer from "../../components/headerFooter/Footer";
import { Link } from "react-router-dom";
import Axios from "axios";
//import {useSelector} from  "react-redux";
//import {selectUser} from "../../state/user"
//import IconButton from '@material-ui/core/IconButton'
//import EditIcon from '@material-ui/icons/Edit';
//import Tooltip from "@material-ui/core/Tooltip";
//import Avatar from "@material-ui/core/Avatar";
import { UserContext } from "../../App";
import { Redirect } from "@reach/router";

const Profile = () => {
  const [visible, setVisible] = useState(true);
  const [user] = useContext(UserContext);
  const [users, setUsers] = useState({});
  console.log(user);

  useEffect(() => {
    // let u = JSON.parse(localStorage.getItem("user"));
    // let id = u.UserId;
    // console.log(user);
    Axios.get(`http://localhost:5000/api/investor-dashboard/${user.userId}`).then((res) => {

      setUsers(res.data);
      console.log(users);
    });
  }, []);
  if (!user.accesstoken) {
    return <Redirect from='' to='login' noThrow />
  }

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
          </div>
          <div className="userNav">
            <ul className="sideheaders">
              <li>{users.Investor.InvestorFirstName} {users.Investor.InvestorLastName}</li>
              
              <li>Location</li>
              <li>{users.UserEmail}</li>
            </ul>

            {/* <input
                  id="imageInput"
                  // hidden="hidden"
                  type="file"
                  name="sampleFile"
                  accept="image/*"
                  onChange={fileChangeHandler}
                /> */}
            {/* <Tooltip title="Edit profile picture" placement="top">
                  <IconButton htmlFor="imageInput" onClick={uploadHandler}>
                    <EditIcon style={{ color: "#3DB2C7" }} />
                  </IconButton>
                </Tooltip> */}
            {/* <button onClick={uploadHandler}>Upload!</button> */}
          </div>
        </div>

        <div className="profileDetails">
          <div className="row">
            <div className="row">
              <div className="col-md-6 profile-sub-headers">
                <label>Personal Details</label>
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{users.UserEmail}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>National ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>{users.Investor.InvestorNationalId}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Gender</label>
                    </div>
                    <div className="col-md-6">
                      <p>{users.Investor.InvestorGender}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{users.Investor.InvestorPhone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Expertise</label>
                    </div>
                    <div className="col-md-6">
                      <p>{users.Investor.InvestorExpertise}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 profile-sub-headers">
                <label>Address Details</label>
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Street</label>
                    </div>
                    <div className="col-md-6">
                      <p>Kimathi</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Town</label>
                    </div>
                    <div className="col-md-6">
                      <p>Ruiru</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>City</label>
                    </div>
                    <div className="col-md-6">
                      <p>Nairobi</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Address</label>
                    </div>
                    <div className="col-md-6">
                      <p>98674</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Postal Code</label>
                    </div>
                    <div className="col-md-6">
                      <p>00100</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>County</label>
                    </div>
                    <div className="col-md-6">
                      <p>Nairobi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Profile;
