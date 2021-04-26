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
import Users from './components/Users';
import Payments from './components/Payments';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';

library.add(fab, faUsers, faHome, faFolder, faCreditCard,faCog, faBars, faEye, faEdit, faTrash);

function App() {
  return (
    <div>
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/users" component={Users} />
          {/* <Route exact path="/posts" component={Posts} /> */}
          <Route exact path="/payments" component={Payments} />
          <Route exact path="/settings" component={Settings} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
