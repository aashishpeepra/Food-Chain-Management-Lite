import React from "react";
import "./Button.css";
export default (props)=>{
    return (
    <button type="button" onClick={props.func} className="btn">{props.value}</button>
    )
}