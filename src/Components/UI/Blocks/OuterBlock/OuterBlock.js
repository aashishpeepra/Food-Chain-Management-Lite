import React from "react";
import "./OuterBlock.css";
import EachBlock from "./EachBlock/EachBlock";

export default (props)=>{
    return (
        <section className="Available-Category-Block">
            <div className="Available-Category-Block-Head">
                <h2>Chicken</h2>
                <span> Total : <p style={{display:"inline",color:"#111"}}>123 Kg</p></span>
            </div>
            <div className="Available-Category-Block-Items">
                <EachBlock color="green"/>
                <EachBlock color="green"/>
                <EachBlock color="green"/>
                <EachBlock color="green"/>
                <EachBlock color="red"/>
                <EachBlock color="green"/>
                <EachBlock color="red"/>
            </div>
        </section>
    )
}