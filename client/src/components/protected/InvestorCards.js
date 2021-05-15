import React, { useState,useEffect } from "react";
import Footer from "../../components/headerFooter/Footer";
import Header from "../../components/headerFooter/Header";
import "./invcards.css";
import { Icon } from "@iconify/react";
import arrowRight from "@iconify-icons/mdi/arrow-right";
import locationIcon from "@iconify-icons/codicon/location";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../state/user";

import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Axios from "axios";
import $ from "jquery";

const InvestorCards = () => {
  const [visible, setVisible] = useState(true);
  const [users, setUsers] = useState([]);
  const [userdetails, setUserdetails] = useState([]);
  const [searchText, setSearchText] = useState("");
  const user = useSelector(selectUser);
  // if (!user.accesstoken) {
  //   return <Redirect from="" to="login" noThrow />;
  // }

  const getUser = (id) => {
    Axios.get("http://localhost:5500/investor/${id}").then((res) => {
      console.log(res.data);
      setUserdetails(res.data[0]);
      $("#myModal").modal("show");
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:5500/investor").then((res) => {
      console.log(res.data);
      setUsers(res.data);
      //console.log(users);
    });
  }, []);
  const updateUsers = (id) => {
    Axios.put("http://localhost:5500/investorupdate", {}).then((res) => {
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

  const excludeColumns = ["id"];

  const filterUsers = (value) => {
    Axios.get("http://localhost:5500/investor").then((res) => {
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
      <input
        style={{ marginLeft: 5, textAlign: 'center' }}
        type="text"
        placeholder="Search for investors..."
        value={searchText}
        className='text-align-center'
        onChange={(e) => handleChange(e.target.value)}
      />
      <section className="testimonials">
        <div className="testimonial-container">
          <h2>Investors</h2>
          <p></p>
          <div className="row">
            {users.map((val, key) => {
              return (
                <div className="iCardinv col-md-3 text-center">
                  <div className="profile">
                    <img
                      src="/img/user1.jpg"
                      alt=""
                      className="user justify-content-center"
                    />
                    <div className="text-center">
                      <h6
                        style={{ color: "#333" }}
                        className="name justify-content-center"
                      >
                        {val.firstName} {val.lastName}
                      </h6>
                      <p class="location justify-content-center">
                        <Icon
                          className="location-icon"
                          color={"#3DB2C7"}
                          icon={locationIcon}
                        />{" "}
                        {val.location}
                      </p>
                    </div>
                    <div class="text-center">
                      {/* <span class="total d-block pt-2">Investment Range</span> */}
                      <span className="amt-range">{val.investmentRange}</span>
                    </div>
                    <div class="text-center expertise">
                      <span>Expertise</span>
                      <p>{val.expertise}</p>
                    </div>
                    <div className="viewmore text-center align-items-center d-flex justify-content-center pt-2 pb-2">
                      <Link to="InvViewProfile">
                        <span className="details">View Details</span>
                        <Icon className="arrow-right" icon={arrowRight} />
                      </Link>
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

export default InvestorCards;
