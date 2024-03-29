import React, { useState, useContext, useEffect } from "react";
//import {BrowserRouter as Link} from 'react-router-dom'
import Header from "../../components/headerFooter/Header";
import Footer from "../../components/headerFooter/Footer";
import { Link } from "react-router-dom";
import Axios from "axios";
import { UserContext } from "../../App";
import { Redirect } from "@reach/router";
import Moment from 'moment';
import Modal from 'react-modal';

const Profile = () => {
  const [visible, setVisible] = useState(true);
  const [user] = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [investor, setInvestor] = useState([]);
  const [invAdd, setInvAdd] = useState([])
  
  let u = JSON.parse(localStorage.getItem("user"));
  let id = u.UserId;
  
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/api/investor-dashboard/${id}`).then((res) => {
          //console.log(res.data.Investor);
          setUsers(res.data);
          setInvestor(res.data.Investor);
          setVisible(true);
         // console.log(investor);
        });
      } catch (error) {
        console.error(error);
      }
    }

    const getInvAddress = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/api/investor-address/${id}`).then((res) => {

          setInvAdd(res.data);
        });
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
    getInvAddress();

    return () => {
      isMounted = false;
      controller.abort();
    }
    
  }, []);

  const updateInv = (e) => {
    e.preventDefault();
    Axios.put(`http://localhost:5000/api/update-investor/${id}`).then((res) => {
      setVisible(false);
      
    });
  };

  if (!user.accesstoken) {
    return <Redirect from='' to='login' noThrow />
  }

  
  return (
    <div>
      <Header />
      <div className="userProfile" >
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

                    <li>{investor.InvestorFirstName + " " + investor.InvestorLastName}</li>

                    <li>{invAdd.InvestorCity + ", " + invAdd.InvestorCounty}</li>
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
                {/* <Link to="update-investor">Update</Link> */}
                    </div>
                  </div>
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
                            <p>{investor.InvestorNationalId}</p>
                          </div>
                        </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label>Date of Birth</label>
                        </div>
                        <div className="col-md-6">
                          <p>{Moment(investor.InvestorDateOfBirth).format('DD-MM-YYYY')}</p>
                        </div>
                      </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Gender</label>
                          </div>
                          <div className="col-md-6">
                            <p>{investor.InvestorGender}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Phone</label>
                          </div>
                          <div className="col-md-6">
                            <p>{investor.InvestorPhone}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Expertise</label>
                          </div>
                          <div className="col-md-6">
                            <p>{investor.InvestorExpertise}</p>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-md-6 profile-sub-headers">
                      <label>Investor Address Details</label>
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
                          <p>{invAdd.InvestorStreet}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>City</label>
                          </div>
                          <div className="col-md-6">
                          <p>{invAdd.InvestorCity}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>P.O Box</label>
                          </div>
                          <div className="col-md-6">
                          <p>{invAdd.InvestorPoBox}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Postal Code</label>
                          </div>
                          <div className="col-md-6">
                          <p>{invAdd.InvestorPostalCode}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label>County</label>
                          </div>
                          <div className="col-md-6">
                          <p>{invAdd.InvestorCounty}</p>
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
