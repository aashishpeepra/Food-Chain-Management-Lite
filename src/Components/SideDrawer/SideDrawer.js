import React from "react";
import "./SideDrawer.css";
import { NavLink } from "react-router-dom";
import { logout } from "../../firebase";

const sideDrawer = (props) => {
  let classes = ["Sidedrawer"];
  if (props.show) {
    classes = ["Sidedrawer", "Open"];
  }
  return (
    <nav className={classes.join(" ")}>
      <div className="Info__Box">
        <div className="Name__Box">
          {!props.loggedIn ? "" : props.userInfo.name}
        </div>
        <div className="Email__Box">
          {!props.loggedIn ? "" : props.userInfo.email}
        </div>
      </div>
      <div className="Options">
        <div className="Options__Home">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div>
        <div className="Options__Home">
          <NavLink to="/">Boys</NavLink>
        </div>
        <div className="Options__Home">
          <NavLink to="/">Girls</NavLink>
        </div>
        <div className="Options__Home">
          <NavLink to="/">Baby Boys</NavLink>
        </div>
        <div className="Options__Home">
          <NavLink to="/">Baby Girls</NavLink>
        </div>
        <div className="Options__Cart">
          <NavLink to="/cart">Cart</NavLink>
        </div>
        {
          props.loggedIn ? (
            <React.Fragment>
              <div className="Options__Orders">
                <NavLink to="/user">My Orders</NavLink>
              </div>
              <div className="Options__Account">
                <NavLink to="/user">My Account</NavLink>
              </div>
            </React.Fragment>

          ) : null
        }

        <div className="Options__Log">
          <NavLink
            onClick={props.loggedIn ? logout : () => { }}
            to={props.loggedIn ? "logout" : "login"}
          >
            {props.loggedIn ? "Log out" : "Log in"}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};


export default sideDrawer;