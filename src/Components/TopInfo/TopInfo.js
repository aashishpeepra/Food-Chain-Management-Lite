import React from 'react';
import "./TopInfo.css";
import DatePicker from "../DatePicker"

export default class TopInfo extends React.Component{
    state={

    }
    render(){
        return (
            <section id="Outlet-information" className="outlet-info">
                <div className="information-box purple">
                    <p>Hub name: Hafeezpet</p>
                </div>
                
                <div className="information-box green">
                    <p>Hub incharge: Elaya</p>
                </div>
                <div >
                <DatePicker date={new Date().getTime()}/>
                </div>
                
            </section>
        )
    }
}