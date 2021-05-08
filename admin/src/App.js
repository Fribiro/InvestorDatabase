import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faUsers,
  faHome,
  faFolder,
  faCreditCard,
  faCog,
  faBars,
  faEye,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Dashboard from './components/Dashboard';
import EntDetails from './components/EntDetails';
import InvDetails from "./components/InvDetails";
import Payments from './components/Payments';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import InvestorPosts from './components/investorPosts';
import EntrepreneurPosts from './components/entrepreneurPosts';

library.add(fab, faUsers, faHome, faFolder, faCreditCard,faCog, faBars, faEye, faEdit, faTrash);

function App() {
  return (
    <div>
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/entrepreneurs" component={EntDetails} />
          <Route exact path="/investors" component={InvDetails} />
          <Route exact path="/entrepreneurPosts" component={EntrepreneurPosts} />
          <Route exact path="/investorPosts" component={InvestorPosts} />
          <Route exact path="/payments" component={Payments} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
