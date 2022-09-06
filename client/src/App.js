import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import './App.css';
import Axios from "axios";
import { navigate } from "@reach/router";
import DotLoader from "react-spinners/DotLoader";
import { Link, Redirect } from "react-router-dom";
import Home from "./components/public/Home";
import Entrepreneur from "./components/public/Entrepreneur";
import Investor from "./components/public/Investor";
import Login from "./components/userAuth/Login";
import About from "./components/public/About";
import Contact from "./components/public/Contact";
import Profile from "./components/profile/Profile";
import InvestorCards from "./components/protected/InvestorCards";
import EntrepreneurCards from "./components/protected/EntrepreneurCards";
import PasswordForget from "./components/passwordReset/PasswordForget";
import SignupOverlay from "./components/userAuth/signupOverlay";
import ResetPassword from "./components/passwordReset/ResetPassword";
import InvViewProfile from "./components/profile/InvViewProfile";
import EntViewProfile from "./components/profile/EntViewProfile";
import LoginOverlay from "./components/userAuth/loginOverlay";
import Wallet from "./components/protected/Wallet";
import UpdateProfile from "./components/profile/UpdateProfile";
import jwt_decode from "jwt-decode"
//import EntProfile from "./components/profile/EntProfile";

export const UserContext = React.createContext([]);

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    let abortController = new AbortController();
    let aborted = abortController.signal.aborted;

    const refresh = async () => {
      try {
        const localUse = localStorage.getItem("user");
        console.log(localUse);

        if (localUse == null) {

        } else {
          const result = await Axios.post(`http://localhost:5000/api/refresh_token`, user.UserEmail);

          console.log(result);
          const { accesstoken, userId, UserRole } = result.data;
          const userData = {
            accesstoken: accesstoken,
            //email: UserEmail,
            userId: userId,
            role: UserRole
          }

          localStorage.setItem("user", JSON.stringify(userData));
          const localUser = JSON.parse(localStorage.getItem("user"));

          // setUser({userData})
          // console.log(user);
        }

      } catch (error) {
        console.log(error);
      }
    };
    refresh()


    const axiosJwt = Axios.create();

    axiosJwt.interceptors.request.use(
      async (config) => {
        let currentDate = new Date();
        const decodedToken = jwt_decode(user.accesstoken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          const data = await refresh();

          config.headers["authorization"] = data.data.accesstoken
        }
        return config;
      }, (error) => {
        return Promise.reject(error);
      }
    )

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/entrepreneur" component={Entrepreneur} />
            <Route exact path="/investor" component={Investor} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/profile" component={Profile} />
            {/* <Route exact path="/entrepreneur-profile" component={EntProfile} /> */}
            <Route exact path="/update-profile" component={UpdateProfile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/forgotpassword" component={PasswordForget} />
            <Route exact path="/resetpassword" component={ResetPassword} />
            <Route exact path="/signup" component={SignupOverlay} />
            <Route exact path="/InvestorCards" component={InvestorCards} />
            <Route exact path="/EntrepreneurCards" component={EntrepreneurCards} />
            <Route exact path="/InvViewProfile" component={InvViewProfile} />
            <Route exact path="/EntViewProfile" component={EntViewProfile} />
            <Route exact path="/Wallet" component={Wallet} />
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
