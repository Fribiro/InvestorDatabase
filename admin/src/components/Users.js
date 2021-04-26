import React, {useState, useEffect} from 'react'
import Axios from "axios";
import { BrowserRouter as Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Bootstrap libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//jquery, popper.js libraries for bootstrap modal
import 'jquery/dist/jquery.min.js';

import $ from 'jquery'

const Users = () => {
    const [Id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState(0);
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);
    const [userdetails, setUserdetails] = useState([]);

    const addUsers = () => {
      Axios.post("http://localhost:5500/create", {
        firstName: firstName,
        lastName: lastName,
        email: email,
      }).then(() => {
        setUsers([
          ...users,
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
          },
        ]);
      });
    };

    const getUsers = () => {
      Axios.get("http://localhost/save.php").then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
    };
    useEffect(() => {
       Axios.get("http://localhost:5500/users").then((res) => {
         console.log(res.data);
         setUsers(res.data);
         //console.log(users);
       });
    }, []);
    const updateUsers = (Id) => {
      Axios.put("http://localhost:5500/update", {}).then(
        (res) => {
          setUsers(
            users.map((val) => {
              return val.Id === Id
                ? {

                    firstName: val.firstName,
                    lastName: val.lastName,
                    email: val.email,
                  }
                : val;
            })
          );
        }
      );
    };

    const deleteUsers = (Id) => {
      Axios.delete(`http://localhost:5500/delete/${Id}`).then((res) => {
        setUsers(
          users.filter((val) => {
            return val.Id !== Id;
          })
        );
      });
    };

    return (
      <div className="main-content">
        <div className="maincontainer">
          <div className="container mb-5 mt-5 text-left">
            <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                
                {users.map((val, key) => {
                  return (
                    <tr>
                      <td>{val.Id}</td>
                      <td>{val.firstName}</td>
                      <td>{val.lastName}</td>
                      <td>{val.email}</td>
                      <td>
                        <button
                          className="bg-info"
                          onClick={(e) => {
                            users(val.Id);
                          }}
                        >
                          <FontAwesomeIcon icon="eye" size="lg" />
                        </button>
                        <button
                          className="bg-warning"
                          onClick={(e) => {
                            updateUsers(val.id);
                          }}
                        >
                          <FontAwesomeIcon icon="edit" size="lg" />
                        </button>
                        <button
                          className="bg-danger"
                          onClick={(e) => {
                            deleteUsers(val.id);
                          }}
                        >
                          <FontAwesomeIcon icon="trash" size="lg" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <div class="modal" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title align-center">
                    User : {this.state.userdetails.username}
                  </h4>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <div class="modal-body text-center">
                  <table class="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{userdetails.id}</td>
                        <td>{userdetails.firstName}</td>
                        <td>{userdetails.laststName}</td>
                        <td>{userdetails.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
}

export default Users
