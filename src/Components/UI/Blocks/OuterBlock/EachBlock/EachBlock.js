import React from 'react';
import "./EachBlock.css";

export default (props)=>{
    const color={
        red:"Available-red",
        green:"Available-green"
    };
    return (
        <div className="Available-Each-Block">
            <p>Currycut Skinless</p>
            <span className={color[props.color]}>12 Kg</span>
            <p>Available</p>
        </div>
    )
}