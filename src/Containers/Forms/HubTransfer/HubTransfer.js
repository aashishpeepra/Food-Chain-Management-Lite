import React from 'react';
import TopInfo from "../../../Components/TopInfo/TopInfo";
import "./HubTransfer.css";
import Button from "../../../Components/Button/Button";
import {db} from "../../../firebase";
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
        transfer:"hub1",
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
    fetchFromFirebase = (collection, doc, cb) => {
        db.collection(collection).doc(doc).get().then(data => {
            console.log(data.data());
            cb(data.data());
        })
            .catch(err => {
                console.log('error while fetching', err);
            })
    }
    converArrayIntoObjectClassify = (data) => {
        let result = {};
        let data2 = [...data];
        data2.forEach(element => {
            let key = element["category"];
            delete element["category"];
            if(result[key]===undefined)
                result[key]=[element]
            else
                result[key].push( element);
        });
        console.log(result);
        return result;
    }
    upDateToFirebase = () => {
        console.log("hERE")
        this.fetchFromFirebase("transfer","hub1",(prevData)=>{
            if(prevData.entry===undefined)
                prevData=[];
            else
            prevData=prevData.entry;
                let data = this.converArrayIntoObjectClassify(this.state.data);
            
            prevData.push({data:data,date:this.state.date});
            console.log(prevData)
            db.collection("transfer").doc("hub1").set({
                name: "hub1",
                incharge: "X Men",
                entry: prevData,
                transferto:this.state.transfer
            })
        })
    }
    render(){
        return(
            <section id="Hub-Transfer" className="hub-transfer">
                <div style={{marginBottom:"20px;"}}>
                    <h1>Transfer To Hub</h1>
                </div>
                <div style={{margin:"30px"}}>
                    <TopInfo />
                </div>
                <div className="hub-transfer-select">
                    <h3>Select Outlet To Transfer</h3>
                    <select value={this.state.transfer} name="send">
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
                    <Button value="Submit" func={this.upDateToFirebase} />
                </div>
            </section>
        )
    }
}

export default HubTransfer;