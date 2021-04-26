import React, {useState} from 'react'
import Adminbody from './Adminbody'
import Sidebar from './Sidebar';

const Home = () => {
    return (
      <div>
         <Sidebar />
         <Adminbody />
      </div>
    );
}

export default Home
