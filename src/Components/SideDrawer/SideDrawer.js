import React from "react";
import "./SideDrawer.css";
import { NavLink } from "react-router-dom";
import "../../Styles/basicStyle.css";
import { logout } from "../../firebase";

const sideDrawer = (props) => {
  let classes = ["Sidedrawer"];
  if (props.show) {
    classes = ["Sidedrawer", "Open"];
  }
  return (
    <nav className={classes.join(" ")}>
    
      <div className="Options">
        <div className="Options__Home">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
        <div className="Options__Home">
          <NavLink to="/forms/stockavailable">Stock Available</NavLink>
        </div>
        <div className="Options__Home">
          <NavLink to="/forms/stockreceived">Stock Received</NavLink>
        </div>
        <div className="Options__Home">
          <NavLink to="/forms/hubtransfer">Hub Transfer</NavLink>
        </div>
        <div className="Options__Home">
          <NavLink to="/forms/carcass">Carcass Converter</NavLink>
        </div>
        <div className="Options__Cart">
          <NavLink to="/forms/returnfromhub">Return From Hub</NavLink>
        </div>
        
        <div className="Options__Cart">
          <NavLink to="/forms/deliverysla">Delivery SLA</NavLink>
        </div>
        
        <div className="Options__Cart">
          <NavLink to="/forms/salesentry">Sales Entry</NavLink>
        </div>
      

        
      </div>
    </nav>
  );
};


export default sideDrawer;