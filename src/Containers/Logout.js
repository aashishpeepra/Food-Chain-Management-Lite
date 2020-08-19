import React from "react";
import { logout } from "../firebase";
import * as actionTypes from "../store/actions";
import { connect } from "react-redux";

class Logout extends React.Component{
    componentWillMount(){
        logout(this.loggingOut);
        
    }
    loggingOut=()=>{
        this.props.onLogout();
        this.props.history.push("/");
    }
    render(){
        return(
            <h1>Logging Out...</h1>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      loggedIn: state.loggedIn,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onLoginSuccess: (e) => dispatch({ type: actionTypes.LOGIN__SUCCESS,obj:e }),
      onLogout: () => dispatch({ type: actionTypes.LOGOUT }),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Logout);