import React from "react";
import "./Login.css";
import { loginUser } from "../../../firebase";
import * as actionTypes from "../../../store/actions";
import { connect } from "react-redux";
import Button from "../../../Components/Button/Button";
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
  componentWillMount(){
    
    if(this.props.auth)
    this.props.history.push("/dashboard")
  }
  render() {
    return (
      <section id="login">

        <h1>Login </h1>
        <form className="Login">
          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              onChange={this.onInputChange}
              type="email"
              id="email"
              name="email"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <input
              onChange={this.onInputChange}
              type="password"
              id="password"
              name="password"
            />
          </fieldset>
          <div className="Login-button">
            <Button value="Login" func={this.logInFunc} />
          </div>

        </form>
      </section>
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
