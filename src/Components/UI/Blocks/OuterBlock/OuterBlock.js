import React from "react";
import "./OuterBlock.css";
import EachBlock from "./EachBlock/EachBlock";
const uom={
    1:{
        name:"500 grams",
        value:0.5
    },
    2:{
        name:"1 Kg",
        value:1
    },
    3:{
        name:"Half Dozen",
        value:6
    },
    4:{
        name:"1 Dozen",
        value:12
    },
    5:{
        name:"1 Litre",
        value:1
    },
    6:{
        name:"1 Piece",
        value:1
    }
}
export default (props)=>{
    console.log(uom[props.data.elems[0].uom])
    return (
        <section className="Available-Category-Block">
            <div className="Available-Category-Block-Head">
    <h2>{props.data.name}</h2>
    <span> Total : <p style={{display:"inline",color:"#111"}}>{props.data.sum } </p></span>
            </div>
            <div className="Available-Category-Block-Items">
               {props.data.elems.map(each=><EachBlock key={each.product} color="green" product={each.product} uom={uom[each.uom].name} qty={each.qty}/>)}
            </div>
        </section>
    )
}