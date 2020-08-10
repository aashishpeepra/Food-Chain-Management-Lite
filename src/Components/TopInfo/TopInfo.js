import React from 'react';
import "./TopInfo.css";
import DatePicker from "../DatePicker"

export default class TopInfo extends React.Component {
    state = {

    }
    render() {
        return (
            <div>
                          
                <section id="Outlet-information" className="outlet-info">
                <div className="information-box purple">
                    <p>Hub name: Hafeezpet</p>
                </div>

                <div className="information-box green">
                    <p>Hub incharge: Elaya</p>
                </div>
                <div >
                    <p style={{fontWeight:"700"}}> On Date</p>
                    <DatePicker date={new Date().getTime()} />
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