import React, { useState, } from 'react'
import Footer from '../../components/headerFooter/Footer';
import Header from '../../components/headerFooter/Header';
import "./protected.css";
import { Icon } from "@iconify/react";
import arrowRight from "@iconify-icons/mdi/arrow-right";
import locationIcon from "@iconify-icons/codicon/location";
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../state/user";

const EntrepreneurCards = () => {
  const [visible, setVisible] = useState(true);
  
  const user = useSelector(selectUser);
  if (!user.accesstoken) {
    return <Redirect from="" to="login" noThrow />;
  }

  return (
    <div>
      {visible ? <Header /> : null}
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
         <section className="testimonials">
           <div className="testimonial-container">
             <h2>Entrepreneurs</h2>
             <p></p>
             <div className="row">
               <div className="iCard col-md-3 text-center">
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
                       Festus Ribiro
                     </h6>
                     <p class="location justify-content-center">
                       <Icon className="location-icon" icon={locationIcon} />{" "}
                       Nairobi, Kenya
                     </p>
                   </div>
                   <div class="text-center">
                     {/* <span class="total d-block pt-2">Investment Range</span> */}
                     <span className="amt-range">Ksh500,000 - Ksh1,000,000</span>
                   </div>
                   <div class="text-center expertise">
                     <span>Expertise</span>
                     <p>Tech, Real Estate, Entertainment</p>
                   </div>
                   <div className="viewmore text-center align-items-center d-flex justify-content-center pt-2 pb-2">
                     <Link>
                       <span className="details">View Details</span>
                       <Icon className="arrow-right" icon={arrowRight} />
                     </Link>
                   </div>
                 </div>
               </div>
               <div className="iCard col-md-3 text-center">
                 <div className="profile">
                   <img
                     src="/img/user2.jpg"
                     alt=""
                     className="user justify-content-center"
                   />
                   <div className="text-center">
                     <h6
                       style={{ color: "#333" }}
                       className="name justify-content-center"
                     >
                       Festus Ribiro
                     </h6>
                     <p class="location justify-content-center">
                       <Icon className="location-icon" icon={locationIcon} />{" "}
                       Nairobi, Kenya
                     </p>
                   </div>
                   <div class="text-center">
                     {/* <span class="total d-block pt-2">Investment Range</span> */}
                     <span className="amt-range">Ksh500,000 - Ksh1,000,000</span>
                   </div>
                   <div class="text-center expertise">
                     <span>Expertise</span>
                     <p>Tech, Real Estate, Entertainment</p>
                   </div>
                   <div className="viewmore text-center align-items-center d-flex justify-content-center pt-2 pb-2">
                     <Link>
                       <span className="details">View Details</span>
                       <Icon className="arrow-right" icon={arrowRight} />
                     </Link>
                   </div>
                 </div>
               </div>
               <div className="iCard col-md-3 text-center">
                 <div className="profile">
                   <img
                     src="/img/user3.jpg"
                     alt=""
                     className="user justify-content-center"
                   />
                   <div className="text-center">
                     <h6
                       style={{ color: "#333" }}
                       className="name justify-content-center"
                     >
                       Festus Ribiro
                     </h6>
                     <p class="location justify-content-center">
                       <Icon className="location-icon" icon={locationIcon} />{" "}
                       Nairobi, Kenya
                     </p>
                   </div>
                   <div class="text-center">
                     {/* <span class="total d-block pt-2">Investment Range</span> */}
                     <span className="amt-range">Ksh500,000 - Ksh1,000,000</span>
                   </div>
                   <div class="text-center expertise">
                     <span>Expertise</span>
                     <p>Tech, Real Estate, Entertainment</p>
                   </div>
                   <div className="viewmore text-center align-items-center d-flex justify-content-center pt-2 pb-2">
                     <Link>
                       <span className="details">View Details</span>
                       <Icon className="arrow-right" icon={arrowRight} />
                     </Link>
                   </div>
                 </div>
               </div>
               <div className="iCard col-md-3 text-center">
                 <div className="profile">
                   <img
                     src="/img/user4.jpg"
                     alt=""
                     className="user justify-content-center"
                   />
                   <div className="text-center">
                     <h6
                       style={{ color: "#333" }}
                       className="name justify-content-center"
                     >
                       Festus Ribiro
                     </h6>
                     <p class="location justify-content-center">
                       <Icon className="location-icon" icon={locationIcon} />{" "}
                       Nairobi, Kenya
                     </p>
                   </div>
                   <div class="text-center">
                     {/* <span class="total d-block pt-2">Investment Range</span> */}
                     <span className="amt-range">Ksh500,000 - Ksh1,000,000</span>
                   </div>
                   <div class="text-center expertise">
                     <span>Expertise</span>
                     <p>Tech, Real Estate, Entertainment</p>
                   </div>
                   <div className="viewmore text-center align-items-center d-flex justify-content-center pt-2 pb-2">
                     <Link>
                       <span className="details">View Details</span>
                       <Icon className="arrow-right" icon={arrowRight} />
                     </Link>
                   </div>
                 </div>
               </div>
               <div className="iCard col-md-3 text-center">
                 <div className="profile">
                   <img
                     src="/img/user5.jpg"
                     alt=""
                     className="user justify-content-center"
                   />
                   <div className="text-center">
                     <h6
                       style={{ color: "#333" }}
                       className="name justify-content-center"
                     >
                       Festus Ribiro
                     </h6>
                     <p class="location justify-content-center">
                       <Icon className="location-icon" icon={locationIcon} />{" "}
                       Nairobi, Kenya
                     </p>
                   </div>
                   <div class="text-center">
                     {/* <span class="total d-block pt-2">Investment Range</span> */}
                     <span className="amt-range">Ksh500,000 - Ksh1,000,000</span>
                   </div>
                   <div class="text-center expertise">
                     <span>Expertise</span>
                     <p>Tech, Real Estate, Entertainment</p>
                   </div>
                   <div className="viewmore text-center align-items-center d-flex justify-content-center pt-2 pb-2">
                     <Link>
                       <span className="details">View Details</span>
                       <Icon className="arrow-right" icon={arrowRight} />
                     </Link>
                   </div>
                 </div>
               </div>
               <div className="iCard col-md-3 text-center">
                 <div className="profile">
                   <img
                     src="/img/user6.jpg"
                     alt=""
                     className="user justify-content-center"
                   />
                   <div className="text-center">
                     <h6
                       style={{ color: "#333" }}
                       className="name justify-content-center"
                     >
                       Festus Ribiro
                     </h6>
                     <p class="location justify-content-center">
                       <Icon className="location-icon" icon={locationIcon} />{" "}
                       Nairobi, Kenya
                     </p>
                   </div>
                   <div class="text-center">
                     {/* <span class="total d-block pt-2">Investment Range</span> */}
                     <span className="amt-range">Ksh500,000 - Ksh1,000,000</span>
                   </div>
                   <div class="text-center expertise">
                     <span>Expertise</span>
                     <p>Tech, Real Estate, Entertainment</p>
                   </div>
                   <div className="viewmore text-center align-items-center d-flex justify-content-center pt-2 pb-2">
                     <Link>
                       <span className="details">View Details</span>
                       <Icon className="arrow-right" icon={arrowRight} />
                     </Link>
                   </div>
                 </div>
               </div>
               <div className="iCard col-md-3 text-center">
                 <div className="profile">
                   <img
                     src="/img/user6.jpg"
                     alt=""
                     className="user justify-content-center"
                   />
                   <div className="text-center">
                     <h6
                       style={{ color: "#333" }}
                       className="name justify-content-center"
                     >
                       Festus Ribiro
                     </h6>
                     <p class="location justify-content-center">
                       <Icon className="location-icon" icon={locationIcon} />{" "}
                       Nairobi, Kenya
                     </p>
                   </div>
                   <div class="text-center">
                     {/* <span class="total d-block pt-2">Investment Range</span> */}
                     <span className="amt-range">Ksh500,000 - Ksh1,000,000</span>
                   </div>
                   <div class="text-center expertise">
                     <span>Expertise</span>
                     <p>Tech, Real Estate, Entertainment</p>
                   </div>
                   <div className="viewmore text-center align-items-center d-flex justify-content-center pt-2 pb-2">
                     <Link>
                       <span className="details">View Details</span>
                       <Icon className="arrow-right" icon={arrowRight} />
                     </Link>
                   </div>
                 </div>
               </div>
               <div className="iCard col-md-3 text-center">
                 <div className="profile">
                   <img
                     src="/img/user6.jpg"
                     alt=""
                     className="user justify-content-center"
                   />
                   <div className="text-center">
                     <h6
                       style={{ color: "#333" }}
                       className="name justify-content-center"
                     >
                       Festus Ribiro
                     </h6>
                     <p class="location justify-content-center">
                       <Icon className="location-icon" icon={locationIcon} />{" "}
                       Nairobi, Kenya
                     </p>
                   </div>
                   <div class="text-center">
                     {/* <span class="total d-block pt-2">Investment Range</span> */}
                     <span className="amt-range">Ksh500,000 - Ksh1,000,000</span>
                   </div>
                   <div class="text-center expertise">
                     <span>Expertise</span>
                     <p>Tech, Real Estate, Entertainment</p>
                   </div>
                   <div className="viewmore text-center align-items-center d-flex justify-content-center pt-2 pb-2">
                     <Link>
                       <span className="details">View Details</span>
                       <Icon className="arrow-right" icon={arrowRight} />
                     </Link>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </section>
         {visible ? <Footer /> : null}
    </div>
  )
}

export default EntrepreneurCards
