import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar({ onLogout }) {
  return (
    <div className="navbar" style={{padding: "5px 50px"}}>
      <div className="logo">
        <img src="./wayalogo.png" alt="" width={"70px"}/>
      </div>
      <div className="navbar-items">
        {/* <ul>
          <li className="item">Dashboard</li>
          <li className="item">Dashboard</li>
          <li className="item">Dashboard</li>
          <li className="item">Dashboard</li>
          <li className="item">Dashboard</li>
        </ul> */}
      </div>
      <div className="profile">
          <button className="btn btn-danger" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
