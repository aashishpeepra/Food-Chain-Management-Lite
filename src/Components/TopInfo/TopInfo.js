import React from 'react';
import "./TopInfo.css";
import DatePicker from "../DatePicker"

export default class TopInfo extends React.Component {
    state = {
        dt:new Date()
    }
    render() {
        console.log(this.props,new Date(this.props.date))
        return (
            <div>
                          
                <section id="Outlet-information" className="outlet-info">
                <div className="information-box purple">
        <p>Hub name: {this.props.hub}</p>
                </div>

                <div className="information-box green">
        <p>Hub incharge: {this.props.incharge}</p>
                </div>
                <div >
                    <p style={{fontWeight:"700"}}> On Date</p>
                    <DatePicker change={this.props.setDate} selected={this.props.date}   />
                </div>
                {/*Uncomment if need till date* */}
                {/* <div >
                    <p>To Date</p>
                <DatePicker date={new Date().getTime()}/>
                </div> */}

            </section>
            </div>
        )
    }
}