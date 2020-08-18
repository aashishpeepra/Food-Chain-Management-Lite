import React from 'react';
import "./EachBlock.css";

export default (props)=>{
    const color={
        red:"Available-red",
        green:"Available-green"
    };
    return (
        <div className="Available-Each-Block">
            <p>{props.product}</p>
    <span className={color[props.color]}>{props.qty }</span>
            <p>Available</p>
        </div>
    )
}