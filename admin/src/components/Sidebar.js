import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Sidebar = () => {
    return (
      <div>
        <input type="checkbox" id="sidebar-toggle"></input>
        <div class="sidebar">
          <div class="sidebar-header">
            <h3 class="brand">
              <span>EkezaKenya</span>
            </h3>
            <label for="sidebar-toggle">
              <FontAwesomeIcon icon="bars" size="lg" />
            </label>
          </div>

          <div class="sidebar-menu">
            <ul>
              <li>
                <Link to="/">
                  <FontAwesomeIcon icon="home" size="lg" />
                  <span>Home</span>
                </Link>
              </li>

              <li>
                <Link to="/users">
                  <FontAwesomeIcon icon="users" size="lg" />
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <Link to="/posts">
                  <FontAwesomeIcon icon="folder" size="lg" />
                  <span>Posts</span>
                </Link>
              </li>
              <li>
                <Link to="/payments">
                  <FontAwesomeIcon icon="credit-card" size="lg" />
                  <span>Payments</span>
                </Link>
              </li>
              <li>
                <Link to="/settings">
                  <FontAwesomeIcon icon="cog" size="lg" />
                  <span>Account</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default Sidebar;
