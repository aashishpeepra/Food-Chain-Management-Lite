import React from 'react';

class ReturnFromHub extends React.Component{
    state={
        returnDate:new Date().getTime(),
        reason:"Reason why to return",
        data:[
            {
                category:"veg",
                name:"nameOfProduct",
                uom:1, //  We will use key value pairs to match UOM,
                qty:2 // quantity
            }
        ]
    }
    render(){
        return(
            <h1>RETURN FROM HUB</h1>
        )
    }
}

export default ReturnFromHub;