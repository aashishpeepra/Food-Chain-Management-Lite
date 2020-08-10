import React from 'react';
import TopInfo from "../../../Components/TopInfo/TopInfo";
import "./StockAvailable.css";

class StockAvailable extends React.Component{
    state={
        data:[
            {
                category:"first",
                product:"second",
                uom:1,
                qty:32
            },
            
            {
                category:"Second",
                product:"hello",
                uom:1,
                qty:23
            }
        ]
    }
    render(){
        return(
            <section id="Stock Available" className="StockAvailable">
            
                <TopInfo/>
            </section>
        )
    }
}

export default StockAvailable;