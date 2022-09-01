import React, { useState } from "react";
import Footer from "../../components/headerFooter/Footer";
import Header from "../../components/headerFooter/Header";
import "./entcards.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Wallet = () => {
  //const [visible, setVisible] = useState(true);
  const [users, setUsers] = useState([]);
  //const [userdetails, setUserdetails] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [wallet, setWallet] = useState([]);

  const handleChange = (value) => {
    setSearchText(value);
    filterUsers(value);
  };

  const excludeColumns = ["id"];

  const filterUsers = (value) => {
    Axios.get("http://localhost:5500/users").then((res) => {
      console.log(res.data);
      //setUsers(res.data);

      const lowercasedValue = value.toLowerCase().trim();
      if (lowercasedValue === "") setUsers(res.data);
      else {
        const filterUsers = users.filter((item) => {
          return Object.keys(item).some((key) =>
            excludeColumns.includes(key)
              ? false
              : item[key].toString().toLowerCase().includes(lowercasedValue)
          );
        });
        setUsers(filterUsers);
      }
    });
  };

  const addToWallet = (users) => {
    console.log("Adding to wallet");
    setWallet([...wallet, users]);
  };

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
              As a founder, lay all the possible scenarios -- from best to worst
              -- in front of you, so you don’t get surprised when something
              happens.
            </p>
          </div>
        </div>
      </header>
      <div>
        <input
          style={{ marginLeft: 5 }}
          type="text"
          placeholder="Search for entrepreneurs..."
          value={searchText}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button>Wallet ({wallet.length})</button>
      </div>
      <section className="testimonials">
        <div className="testimonial-container">
          <h2>Entrepreneurs</h2>
          <p></p>

          <div className="row">
            {wallet.map((val, key) => {
              return (
                <div
                  className="iCard col-md-4 text-center"
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <div className="profile">
                    <div className="businessImg" style={{ height: "170px" }}>
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
                        {val.firstName} {val.lastName}
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
                      <small>{val.bio}</small>
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
                              {val.investmenTarget}
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
                      <Icon
                        className="starOutline"
                        icon="gridicons:star-outline"
                        style={{ cursor: "pointer" }}
                        onClick={() => addToWallet(users)}
                      />
                      <Icon icon="ant-design:delete-outlined" />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="clearboth"></div>
            {users.length === 0 && <span>No records found to display!</span>}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Wallet;
