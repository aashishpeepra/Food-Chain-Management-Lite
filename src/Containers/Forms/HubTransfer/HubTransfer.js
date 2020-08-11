import React from 'react';
import TopInfo from "../../../Components/TopInfo/TopInfo";
import "./HubTransfer.css";
import Button from "../../../Components/Button/Button";

function eachRow(data,currentKey,value,selectChange) {
    data=data.data;
    const keys=Object.keys(data);
    console.log(data,keys,currentKey,data[currentKey]);
    return (
        <div className="sales-entry-each-row">
            <select name="category" onChange={selectChange}>
                {keys.map(each=><option value={each} key={each}>{each}</option>)}
            </select>
            <select name="product"  onChange={selectChange}>
                {data[currentKey].map(each=><option value={each} key={each}>{each}</option>)}
            </select>

            <select name="uom" onChange={selectChange}>
                <option value="1">500 gram</option>
                <option value="2">200 Gram</option>
            </select>
            <input name="qty" type="text" placeholder="Quantity" value={value} onChange={selectChange} />
            <input name="totalweight" type="text" placeholder="Total" value={value!==""?parseFloat(value)*500/1000:0} disabled/>
        </div>
    )
}
class HubTransfer extends React.Component {
    state = {
        data: [],
        date: new Date().getTime(),
        hub1:{
            data:{
                first:[
                    "first","second"
                ],
                second:[
                    "second","second"

                ],
            }
        },
    }
    addNewToData=()=>{
        let copy=[...this.state.data];
        copy.push({category:"first",product:"",uom:1,qty:0});
        this.setState({data:copy});
    }
    setSelectValue=(e,index)=>{
        let copy=[...this.state.data];
        copy[index][e.target.name]=e.target.value;
        this.setState({data:copy});
    }
    render(){
        return(
            <section id="Hub-Transfer" className="hub-transfer">
                <div>
                    <TopInfo/>
                </div>
                <div className="hub-transfer-select">
                    <h3>Select Outlet To Transfer</h3>
                    <select name="send">
                        <option value="hub1">Hub1</option>
                        <option value="hub2">Hub2</option>
                        <option value="hub3">Hub3</option>
                        <option value="hub4">Hub4</option>
                    </select>
                </div>
                <div className="sales-entry-top">
                    {this.state.data.map((each,index)=>eachRow(this.state.hub1,this.state.data[index].category,this.state.data[index].qty,(e)=>this.setSelectValue(e,index)))}
                </div>
                <div>
                    <Button value="Add Item" func={this.addNewToData}/>
                </div>
                <div style={{marginTop:"20px"}}>
                    <Button value="Submit" func={()=>{}} />
                </div>
            </section>
        )
    }
}

export default HubTransfer;