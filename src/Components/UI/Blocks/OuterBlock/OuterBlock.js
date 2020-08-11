import React from "react";
import "./OuterBlock.css";
import EachBlock from "./EachBlock/EachBlock";

export default (props)=>{
    return (
        <section className="Available-Category-Block">
            <div className="Available-Category-Block-Head">
    <h2>{props.data.name}</h2>
                <span> Total : <p style={{display:"inline",color:"#111"}}>{props.data.sum} Kg</p></span>
            </div>
            <div className="Available-Category-Block-Items">
               {props.data.elems.map(each=><EachBlock color="green" product={each.product} qty={each.qty}/>)}
            </div>
        </section>
    )
}