import React, {useState, useEffect} from 'react'
import Axios from "axios";
import { BrowserRouter as Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";

import Swal from "sweetalert2";

//Bootstrap libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//jquery, popper.js libraries for bootstrap modal
import 'jquery/dist/jquery.min.js';
import ReactPaginate from 'react-paginate';

import $ from 'jquery'

const EntDetails = () => {
    const [id, setid] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState(0);
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);
    const [userdetails, setUserdetails] = useState([]);
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState()
    const ITEMS_PER_PAGE = 10;

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
      Axios.get("http://localhost:5500/users").then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
    };
    const getUser = (id) => {
      Axios.get("http://localhost:5500/users/${id}").then((res) => {
        console.log(res.data);
        setUserdetails(res.data[0]);
        $("#myModal").modal("show");
      });
    };
    useEffect(() => {
       Axios.get("http://localhost:5500/users").then((res) => {
         console.log(res.data);
         setUsers(res.data);
         //console.log(users);
       });
    }, []);
    const updateUsers = (id) => {
      Axios.put("http://localhost:5500/update", {}).then(
        (res) => {
          setUsers(
            users.map((val) => {
              return val.id === id
                ? {

                    firstName: val.firstName,
                    lastName: val.lastName,
                    email: val.email,
                  }
                : val;
            })
          );
          $("#editmodal").modal("show");
        }
      );
    };

    const deleteUsers = (id) => {
      Axios.delete(`http://localhost:5500/users/${id}`).then((res) => {
        setUsers(
          users.filter((val) => {
            return val.id !== id;
          })
        );
        Swal.fire({
          title: "User " + id + " has been deleted.",
          text: "Record deleted successfully",
          type: "success",
        });
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
                      <td>{val.id}</td>
                      <td>{val.firstName}</td>
                      <td>{val.lastName}</td>
                      <td>{val.email}</td>
                      <td>
                        <Tooltip title="View user" placement="top">
                          <IconButton
                            htmlFor="imageInput"
                            onClick={() => {
                              getUser(val.Id);
                            }}
                          >
                            <VisibilityIcon
                              style={{ fontSize: 16, color: "#3DB2C7" }}
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete user" placement="top">
                          <IconButton
                            htmlFor="imageInput"
                            onClick={() => {
                              deleteUsers(val.id);
                            }}
                          >
                            <DeleteIcon
                              style={{ fontSize: 16, color: "#3DB2C7" }}
                            />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div class="modal" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title align-center">
                    User : {userdetails.firstName}
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
          </div>

        </div>
      </div>
    );
}

export default EntDetails
