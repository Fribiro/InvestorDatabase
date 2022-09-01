import React, {  useContext, useEffect, useState } from "react";
import Footer from '../../components/headerFooter/Footer';
import Header from '../../components/headerFooter/Header';
import "./entcards.css";
import { Icon } from "@iconify/react";
import { Link, Redirect } from 'react-router-dom';
import Axios from "axios";
import $ from "jquery";
import { UserContext } from "../../App";

const EntrepreneurCards = () => {
  const [user] = useContext(UserContext);
  //const [visible, setVisible] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [wallet, setWallet] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/entrepreneurs").then((res) => {
      console.log(res.data);
      setUsers(res.data);
      //console.log(users);
    });
  }, []);
  
  if (!user.accesstoken) {
    return <Redirect to='/login' />;
  }

  // const getUser = (id) => {
  //   Axios.get("http://localhost:5500/users/${id}").then((res) => {
  //     console.log(res.data);
  //     setUserdetails(res.data[0]);
  //     $("#myModal").modal("show");
  //   });
  // };
  
  const updateUsers = (id) => {
    Axios.put("http://localhost:5000/api/entrepreneurupdate", {}).then((res) => {
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
    });
  };
  const handleChange = (value) => {
    setSearchText(value);
    filterUsers(value);
  };

  const excludeColumns = ["Id","UserUsersId", "FundId"];

  const filterUsers = (value) => {
    Axios.get("http://localhost:5000/api/entrepreneurs").then((res) => {
      console.log(res.data);
      //setUsers(res.data);

      const lowercasedValue = value.toLowerCase().trim();
      if (lowercasedValue === "") {
        setUsers(res.data);
      } else {
        const filterUsers = users.filter((item) => {
          return Object.keys(item).some((key) => {
            return excludeColumns.includes(key)
              ? false
              : item[key].toString().toLowerCase().includes(lowercasedValue);
          });
        });
        setUsers(filterUsers);
      }
    });
  };

  const addToWallet = (users) => {
    console.log('Adding to wallet')
    setWallet([...wallet, users]);
  }

  return (
    <div>
      <Header />
      <header className="">
        <div className="about-header nav-anime">
          <div className="about-header-img">
            <img src="/img/desk6.jpg" alt="" />
          </div>
          <div className="about-header-text">
            <h2>YOUR STEPPING-STONE FROM THE FUTURE</h2>
            <p>
              As a founder, lay all the possible scenarios -- from best to
              worst -- in front of you, so you don’t get surprised when
              something happens.
            </p>
          </div>
        </div>
      </header>
      <div>
        <input
          style={{
            marginLeft: 5,
            textAlign: "center",
            marginLeft: "70%",
            border: "none",
            borderBottom: "1px solid #3DB2C7",
            marginTop: "1rem",
            outline: "none",
          }}
          type="text"
          placeholder="Search for entrepreneurs..."
          value={searchText}
          onChange={(e) => handleChange(e.target.value)}
        />
        {/* <button>
          <Link to='/Wallet'>Wallet ({wallet.length})</Link>
        </button> */}
      </div>
      <section className="testimonials">
        <div className="testimonial-container">
          <h2>Entrepreneurs</h2>
          <p></p>

          <div className="row">
            {users.map((val, key) => {
              return (
                <div
                  className="iCard col-md-4 text-center"
                  style={{
                    marginTop: "10px",
                  }}
                  key={key}
                >
                  <div className="profile">
                    <div
                      className="businessImg"
                      style={{ height: "170px" }}
                    >
                      <img
                        src="/img/user1.jpg"
                        alt=""
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          zIndex: "-1",
                        }}
                      />
                    </div>
                    <div
                      className="text-left"
                      style={{ padding: "0 20px", marginTop: "10px" }}
                    >
                      <h6
                        style={{ color: "#333" }}
                        className="name justify-content-center"
                      >
                        {val.EntrepreneurFirstName} {val.EntrepreneurLastName}
                      </h6>
                      <p
                        class="location justify-content-left"
                        style={{
                          margin: "0",
                        }}
                      >
                        <Icon
                          className="location-icon"
                          color={"#3DB2C7"}
                          icon="akar-icons:location"
                        />{" "}
                        {val.location}
                      </p>
                    </div>
                    <div
                      className="text-justify"
                      style={{ padding: "0 20px", marginTop: "10px" }}
                    >
                      <small>{val.EntrepreneurBio}</small>
                    </div>
                    <div
                      class="text-left expertise"
                      style={{
                        padding: "0 20px",
                        marginTop: "10px",
                        marginBottom: "5px",
                      }}
                    >
                      <table
                        class=""
                        style={{
                          padding: "0 20px",
                          marginTop: "10px",
                          width: "80%",
                        }}
                      >
                        <tbody>
                          <tr>
                            <th
                              style={{
                                fontWeight: "bold",
                                color: "#3DB2C7",
                              }}
                            >
                              Target
                            </th>
                            <th
                              style={{
                                fontWeight: "bold",
                                textAlign: "left",
                                color: "#3DB2C7",
                              }}
                            >
                              Industry
                            </th>
                          </tr>
                          <tr>
                            <td style={{ textAlign: "left" }}>
                              {val.InvestmentTarget}
                            </td>
                            <td style={{ textAlign: "left" }}>Finance</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="viewmore text-center align-items-center d-flex justify-content-center pt-2 pb-2">
                      <Link to="EntViewProfile">
                        <span className="details">View Details</span>
                        <Icon className="arrow-right" icon="bi:arrow-right" />
                      </Link>
                      {/* <Icon
                        className="starOutline"
                        icon="gridicons:star-outline"
                        style={{ cursor: "pointer" }}
                        onClick={() => addToWallet(users)}
                      /> */}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="clearboth"></div>
            {users.length === 0 && (
              <span>No records found to display!</span>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default EntrepreneurCards
