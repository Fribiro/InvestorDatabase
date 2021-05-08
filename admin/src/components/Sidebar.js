import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {$} from "react-jquery-plugin"

const Sidebar = () => {

  useEffect(() => {
      
  }, [])
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

              <li className="dropmenu">
                <Link>
                  <FontAwesomeIcon icon="users" size="lg" />
                </Link>
                <label htmlFor="btn">Users</label>
                <input type="checkbox" id="btn" />
                <ul className="subMenu" id="subMenu">
                  <li>
                    <Link className="" to="/entrepreneurs">
                      Entrepreneur
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/investors">
                      Investor
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="dropmenu">
                <Link>
                  <FontAwesomeIcon icon="folder" size="lg" />
                </Link>
                <label htmlFor="btn-2">Posts</label>
                <input type="checkbox" id="btn-2" />
                <ul className="subMenu" id="subMenu">
                  <li>
                    <Link className="" to="/entrepreneurPosts">
                      Entrepreneur
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/investorPosts">
                      Investor
                    </Link>
                  </li>
                </ul>
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
