import React from 'react';

class StockReceived extends React.Component{
    state={
        date:new Date().getTime(),
        data:[
            {
                category:"",
                name:"",
                type:"vacuum", //  vacuum or regular
                uom:1, // 1 or 2
                qty:22 // quantity
            }
        ]
    }
    render(){
        return(
            <h1>STOCK RECEIVED</h1>
        )
    }
}

export default StockReceived;