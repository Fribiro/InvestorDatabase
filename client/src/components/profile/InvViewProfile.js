import React from 'react'
import Footer from "../../components/headerFooter/Footer";
import Header from "../../components/headerFooter/Header";
import Iframe from "react-iframe";
import "./profile.css";

const InvViewProfile = () => {
    return (
      <div>
        <Header/>
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

        <Footer/>
      </div>
    );
}

export default InvViewProfile
