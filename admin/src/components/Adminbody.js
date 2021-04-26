import React, { useState } from "react";
import Dashboard from './Dashboard'
import Users from './Users';

const Adminbody = () => {
    return (
      <div>
        <Dashboard />
        <Users />
      </div>
    );
}

export default Adminbody;
