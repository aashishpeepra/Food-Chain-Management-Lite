import React from "react";
import "./hoc.css";

import SideDrawer from "../Components/SideDrawer/SideDrawer";
import Backdrop from "../Components/Backdrop/Backdrop";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";

class Aux extends React.Component {
  state = {
    SideDrawerOpen: false,
  };

  backdropClickHandler = () => {
    this.setState({ SideDrawerOpen: false });
  };
  toggleDrawer = () => {
    this.setState({ SideDrawerOpen: !this.state.SideDrawerOpen });
  };
  render() {
    let backdrop;
    if (this.state.SideDrawerOpen) {
      backdrop = <Backdrop clicked={this.backdropClickHandler} />;
    }
    return (
      <main>
        {true ? (
          <div className="burger" onClick={this.toggleDrawer}>
            <div className="each-burger"></div>
            <div className="each-burger"></div>
            <div className="each-burger"></div>
          </div>
        ) : null}
        <SideDrawer show={this.state.SideDrawerOpen} />
        {backdrop}
        {this.props.children}
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps)(Aux);
