import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import './App.css';
import Axios from "axios";
import { navigate } from "@reach/router";
import DotLoader from "react-spinners/DotLoader";

import Home from "./components/Home";
import Entrepreneur from "./components/Entrepreneur";
import Investor from "./components/Investor";
import Login from "./components/Login";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/profile/Profile";
import LoginOverlay from "./components/LoginOverlay";
import InvestorCards from "./components/protected/InvestorCards";
import EntrepreneurCards from "./components/protected/EntrepreneurCards";
import UserContextProvider from './usercontext'
import { useDispatch } from "react-redux";
import { userSet } from "./state/user";


function App() {

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const logoutCallback = async () => {
    Axios.post("http://localhost:5500/logout", {
      method: "POST",
      credentials: "include",
    });
    //create user from context
    setUser({});
    //navigate back to the home page
    navigate("/");
  };


  //get a new accesstoken if a refreshtoken exists
  useEffect(() => {
    const checkRefreshToken = () => {
      
        Axios.post("http://localhost:5500/auth/refresh_token", {
          method: "POST",
          credentials: "include", //adds the cookie
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
      
        dispatch(userSet(res.data.accesstoken));
      
      setLoading(false);
    })
    }
    checkRefreshToken();
  }, []);

  // if (loading) return (
  //   <div
  //     className="loader"
  //     style={{display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", verticalAlign: "middle", height: "100vh"}}
  //   >
  //     <DotLoader
  //       color={"#3DB2C7"}
  //       loading={loading}
  //       size={60}
  //     />
  //   </div>
  // );

  return (
    
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/entrepreneur" component={Entrepreneur} />
            <Route exact path="/investor" component={Investor} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/signup" component={LoginOverlay} />
            <Route exact path="/InvestorCards" component={InvestorCards} />
            <Route
              exact
              path="/EntrepreneurCards"
              component={EntrepreneurCards}
            />
          </Switch>
        </Router>
      </div>
  
  );
}

export default App;
