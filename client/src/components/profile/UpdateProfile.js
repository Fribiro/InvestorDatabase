import React, { useContext, useEffect, useState } from 'react';
import Axios from "axios";
import "./profile.css";
import { UserContext } from '../../App';
import { useParams } from '@reach/router';

const UpdateProfile = () => {
  const [user] = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let u = JSON.parse(localStorage.getItem("user"));
    let id = u.UserId;
    Axios.get(`http://localhost:5000/api/update-investor/${id}`).then((res) => {
      console.log(res.data);
      setUsers(res.data);
      //console.log(users);
    });
  }, []);

    return (
      <div>
        {/* <div className="row">
          <div className="col-md-6">
            <div className="profile-head">
              <h5>Festus Ribiro</h5>
              <h6>Web Developer and Designer</h6>
            </div>
          </div>
          <div className="col-md-6">
            <input
              type="submit"
              className="profile-edit-btn"
              name="btnAddMore"
              value="Edit Profile"
            />
          </div>
        </div> */}

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
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text" 
                      style={{ 
                        textAlign: "center",
                        border: "none",
                        borderBottom: "1px solid #3DB2C7",
                        outline: "none"
                       }} 
                    name="fullName" id="">
                      
                    </input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text"
                      style={{
                        textAlign: "center",
                        border: "none",
                        borderBottom: "1px solid #3DB2C7",
                        outline: "none"
                      }}
                      name="fullName" id="">

                    </input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>National ID</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text"
                      style={{
                        textAlign: "center",
                        border: "none",
                        borderBottom: "1px solid #3DB2C7",
                        outline: "none"
                      }}
                      name="fullName" id="">

                    </input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Gender</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text"
                      style={{
                        textAlign: "center",
                        border: "none",
                        borderBottom: "1px solid #3DB2C7",
                        outline: "none"
                      }}
                      name="fullName" id="">

                    </input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text"
                      style={{
                        textAlign: "center",
                        border: "none",
                        borderBottom: "1px solid #3DB2C7",
                        outline: "none"
                      }}
                      name="fullName" id="">

                    </input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Profession</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text"
                      style={{
                        textAlign: "center",
                        border: "none",
                        borderBottom: "1px solid #3DB2C7",
                        outline: "none"
                      }}
                      name="fullName" id="">

                    </input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text"
                      style={{
                        textAlign: "center",
                        border: "none",
                        borderBottom: "1px solid #3DB2C7",
                        outline: "none"
                      }}
                      name="fullName" id="">

                    </input>
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
                    <input type="text"
                      style={{
                        textAlign: "center",
                        border: "none",
                        borderBottom: "1px solid #3DB2C7",
                        outline: "none"
                      }}
                      name="fullName" id="">

                    </input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Town</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text"
                      style={{
                        textAlign: "center",
                        border: "none",
                        borderBottom: "1px solid #3DB2C7",
                        outline: "none"
                      }}
                      name="fullName" id="">

                    </input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>City</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text"
                      style={{
                        textAlign: "center",
                        border: "none",
                        borderBottom: "1px solid #3DB2C7",
                        outline: "none"
                      }}
                      name="fullName" id="">

                    </input>

                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Address</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text"
                      style={{
                        textAlign: "center",
                        border: "none",
                        borderBottom: "1px solid #3DB2C7",
                        outline: "none"
                      }}
                      name="fullName" id="">

                    </input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Postal Code</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text"
                      style={{
                        textAlign: "center",
                        border: "none",
                        borderBottom: "1px solid #3DB2C7",
                        outline: "none"
                      }}
                      name="fullName" id="">

                    </input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>County</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text"
                      style={{
                        textAlign: "center",
                        border: "none",
                        borderBottom: "1px solid #3DB2C7",
                        outline: "none"
                      }}
                      name="fullName" id="">

                    </input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default UpdateProfile
