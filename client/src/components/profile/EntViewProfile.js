import React, { useContext } from "react";
import Footer from "../../components/headerFooter/Footer";
import Header from "../../components/headerFooter/Header";
import "./profile.css";
import Iframe from "react-iframe";
import { UserContext } from "../../App";
import { Redirect } from "@reach/router";

const EntViewProfile = () => {
  const [user] = useContext(UserContext);

  if (!user.accesstoken) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <Header />
      <header className="">
        <div className="about-header nav-anime">
          <div className="entViewHeader">
            <img
              src="/img/desk2.jpg"
              alt=""
              style={{
                position: "fixed",
                zIndex: -1,
                height: "100vh",
                width: "100%",
              }}
            />
          </div>
          <div className="about-header-text">
            <h2 style={{ color: "white" }}>
              YOUR STEPPING-STONE FROM THE FUTURE
            </h2>
            <p style={{ color: "white" }}>
              As a founder, lay all the possible scenarios -- from best to worst
              -- in front of you, so you don’t get surprised when something
              happens.
            </p>
          </div>
        </div>
      </header>

      <div className="viewProfileBody" style={{ zIndex: 1 }}>
        <div className="entProfileSec1">
          <div className="businessSummary">
            <h3>Summary</h3>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose injected humour and the like.There are many variations of
              passages of Lorem Ipsum available, but the majority have suffered
              alteration in some form, by injected humour, or randomised words
              which don't look even slightly believable. If you are going to use
              a passage of Lorem Ipsum, you need to be sure there isn't anything
              embarrassing hidden in the middle of text.
            </p>
          </div>
          <div className="invNumbers">
            <h3>Overview</h3>
            <table class="styled-table">
              <tbody>
                <tr>
                  <td>Target</td>
                  <td className="td2">Ksh6,000,000</td>
                </tr>
                <tr class="active-row">
                  <td>Investment Raised</td>
                  <td className="td2">N/A</td>
                </tr>
                <tr class="active-row">
                  <td>Stage</td>
                  <td className="td2">Startup</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="entProfileSec2">
          <h3>Pitch</h3>
          <Iframe
            url="https://www.youtube.com/embed/PgbjBI8RpkU"
            width="800px"
            height="400px"
            id="pitchVid"
            className="pitchVid"
            display="initial"
            position="center"
            allowFullScreen
          />
        </div>
        <div className="entProfileSec3">
          <h3>The Business</h3>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum which looks reasonable. The generated Lorem
            Ipsum is therefore always free from repetition, injected humour, or
            non-characteristic words etc.
            <br />
            <br />
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum which looks reasonable. The generated Lorem
            Ipsum is therefore always free from repetition, injected humour, or
            non-characteristic words etc.
          </p>
        </div>
        <div className="entProfileSec4">
          <h3>The Market</h3>
          <div className="entProfileSec4-grid">
            <div className="entProfileSec4-text ">
              <p>
                The market is enormous. The target customer might be children
                aged between 2-10 but the actual client is the parent or
                guardian. Toys, educational toys and child entertainment is a
                multi-billion dollar industry and offering parents a way to turn
                a child's imagination into reality is an amazing and 'feel-good'
                product offering. Our marketing and distribution are focused on
                kindergartens, primary schools, special needs schools and
                parents. Corporate customers can offer this service to clientele
                as per example restaurants or other child care facilities. In
                addition, we will focus on online marketing towards parents
                through social media and will showcase the concept in a variety
                of videos and marketing material aimed and conveying the
                message.
              </p>
            </div>
            <div className="entProfileSec4-img ">
              <img src="/img/board.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="entProfileSec5">
          <h3>The Pricing</h3>
          <p>
            We leverage the site traffic and customer base of partners A, B, and
            C 100,000 unique visits/month to our network of online sites 1,000
            new leads captured per month 0.22 percent average conversion rate 5
            percent monthly churn rate 16 months is the average lifetime value
            LTV of a customer $160 is average revenue per user ARPU $12.50 is
            our customer acquisition cost CAC.It is a long established fact that
            a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has
            a more-or-less normal distribution of letters, as opposed to using
            'Content here, content here', making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for 'lorem ipsum'
            will uncover many web sites still in their infancy. Various versions
            have evolved over the years, sometimes by accident, sometimes on
            purpose
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EntViewProfile;
