import React, { useContext, useEffect, useState } from 'react';
import Header from "../../components/headerFooter/Header";
import Footer from "../../components/headerFooter/Footer";
import { Link } from "react-router-dom";
import Axios from "axios";
import { UserContext } from "../../App";
import { Redirect } from "@reach/router";
import Moment from 'moment';

const EntProfile = () => {
    const [visible, setVisible] = useState(true);
    const [user] = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [entrepreneur, setEntrepreneur] = useState([]);
    const [entAdd, setEntAdd] = useState([])

    let u = JSON.parse(localStorage.getItem("user"));
    let id = u.UserId;

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async () => {
            try {
                const response = await Axios.get(`http://localhost:5000/api/entrepreneur-dashboard/${id}`).then((res) => {
                    //-console.log(res.data.Entrepreneur);
                    setUsers(res.data);
                    setEntrepreneur(res.data.Entrepreneur)
                    // console.log(Entrepreneur);
                });
            } catch (error) {
                console.error(error);
            }
        }

        const getEntAddress = async () => {
            try {
                const response = await Axios.get(`http://localhost:5000/api/entrepreneur-address/${id}`).then((res) => {
                    
                    setEntAdd(res.data);
                    //console.log(entAdd);
                });
            } catch (error) {
                console.error(error);
            }
        }
        getUser();
        getEntAddress();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, []);

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

                          <li>{entrepreneur.EntrepreneurFirstName + " " + entrepreneur.EntrepreneurLastName}</li>

                          <li>{entAdd.EntrepreneurCity + ", " + entAdd.EntrepreneurCounty}</li>
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
                                          <p>{entrepreneur.EntrepreneurNationalId}</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>Date of Birth</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>{Moment(entrepreneur.EntrepreneurDateOfBirth).format('DD-MM-YYYY')}</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>Gender</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>{entrepreneur.EntrepreneurGender}</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>Phone</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>{entrepreneur.EntrepreneurPhone}</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>Profession</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>{entrepreneur.EntrepreneurProfession}</p>
                                      </div>
                                  </div>

                              </div>
                          </div>

                      </div>
                      <div className="row">
                          <div className="col-md-6 profile-sub-headers">
                              <label>Entrepreneur Address Details</label>
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
                                          <p>{entAdd.EntrepreneurStreet}</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>City</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>{entAdd.EntrepreneurCity}</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>P.O Box</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>{entAdd.EntrepreneurPoBox}</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>Postal Code</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>{entAdd.EntrepreneurPostalCode}</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>County</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>{entAdd.EntrepreneurCounty}</p>
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
  )
}

export default EntProfile