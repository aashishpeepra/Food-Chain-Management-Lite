import React from 'react';

class SalesEntry extends React.Component{
    state={
        data:[
            {
                name:"",
                uom:1,
                qty:2
            }
        ],
        date:new Date().getTime(),
    }
    render(){
        return(
            <h1>SALES ENTRY</h1>
        )
    }
}

export default SalesEntry;