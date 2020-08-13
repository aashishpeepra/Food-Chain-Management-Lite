import React from "react";
import { loginUser } from "../../../firebase";
import * as actionTypes from "../../../store/actions";
import { connect } from "react-redux";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };
  onInputChange = (e) => {
    const keyPair = {};
    keyPair[e.target.name] = e.target.value;
    this.setState(keyPair);
  };
  redirectToDashboard = () => {
    this.props.onLoginSuccess();
    this.props.history.push("/dashboard");
  };
  logInFunc = () => {
    loginUser(this.state.email, this.state.password, this.redirectToDashboard);
  };
  render() {
    return (
      <form>
        <label htmlFor="email">Email</label>
        <input
          onChange={this.onInputChange}
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={this.onInputChange}
          type="password"
          id="password"
          name="password"
        />
        <button type="button" onClick={this.logInFunc}>
          LogIn
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSuccess: () => dispatch({ type: actionTypes.LOGIN__SUCCESS }),
    onLogout: () => dispatch({ type: actionTypes.LOGOUT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
