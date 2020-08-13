import React from 'react';
import TopInfo from "../../../Components/TopInfo/TopInfo";
import "./StockReceived.css";
import Button from "../../../Components/Button/Button";
import { db } from "../../../firebase";
function eachRow(index,removeIndex,data, currentKey, value, selectChange) {
    data = data.data;
    const keys = Object.keys(data);
    console.log(data, keys, currentKey, data[currentKey]);
    if(currentKey!==undefined)
    return (
        <div className="sales-entry-each-row">
            {/* <h5>Category</h5> */}
            <select name="category" onChange={selectChange}>
                {keys.map(each => <option value={each} key={each}>{each}</option>)}
            </select>
            {/* <h5>Sub-Category</h5> */}
            <select name="product" onChange={selectChange}>
                {data[currentKey].map(each => <option value={each} key={each}>{each}</option>)}
            </select>
            {/* <h5>Sub-Category</h5> */}
            <select name="uom" onChange={selectChange}>
                <option value="1">500 gram</option>
                <option value="2">200 Gram</option>
            </select>
            {/* <h5>Sub-Category</h5> */}
            <select name="packing" onChange={selectChange}>
                <option value="vacuum">Vaccum Pack</option>
                <option value="regular">Regular</option>
            </select>
            {/* <h5>Sub-Category</h5> */}
            <input name="qty" type="text" placeholder="Quantity" value={value} onChange={selectChange} />
            <input name="total" disabled type="text" placeholder="Total" value={parseFloat(value)*parseFloat(1)}/>
            <div className="cross" onClick={()=>removeIndex(index)}>
                    X
            </div>
        </div>
    )
}
class StockReceived extends React.Component {
    state = {
        data: [],
        date: new Date().getTime(),
        hub1: {
            data: {
                first: [
                    "first", "second"
                ],
                second: [
                    "second", "second"

                ],
            }
        },
    }
    addNewToData = () => {
        let copy = [...this.state.data];
        copy.push({ category: "first", packing: "vacuum", product: "first", uom: 1, qty: 0 });
        this.setState({ data: copy });
    }
    setSelectValue = (e, index) => {
        let copy = [...this.state.data];
        copy[index][e.target.name] = e.target.value;
        this.setState({ data: copy });
    }
    fetchFromFirebase = (collection, doc, cb) => {
        db.collection(collection).doc(doc).get().then(data => {
            console.log(data.data());
            cb(data.data());
        })
            .catch(err => {
                console.log('error while fetching', err, collection, doc);
            })
    }
    converArrayIntoObjectClassify = (data) => {
        let result = {};
        let data2 = [...data];
        data2.forEach(element => {
            let key = element["category"];
            delete element["category"];
            if (result[key] === undefined)
                result[key] = [element]
            else
                result[key].push(element);
        });
        console.log(result);
        return result;
    }
    removeIndex=(index)=>{
        let copy=[...this.state.data];
        copy.splice(index,1);
        this.setState({data:copy});
    }
    upDateToFirebase = () => {
        let data = {...this.converArrayIntoObjectClassify(this.state.data)};
        this.fetchFromFirebase("received", "hub1", (prevData) => {

            prevData = prevData.received;
            prevData.push({ data: data, date: this.state.date });
            db.collection("received").doc("hub2").set({
                name: "hub1",
                incharge: "X Men",
                received: prevData
            })
        })
        this.updateInventory(data)

    }
    updateInventory = (data) => {
        console.log(data)
        this.fetchFromFirebase("stock", "hub1", (prevData) => {
            if (prevData === {}) {
                alert("Stock not available");
            }
            else {
                let keys = Object.keys(data);
                let stock = prevData.stock;
                if (stock === undefined)
                    stock = {};
                keys.forEach(element => {
                    // in case property isn't present
                    if (stock[element] === undefined)
                    {
                        stock[element] = data[element];
                    }
                    else {
                        console.log("-->",stock[element])
                        for (let i = 0; i < data[element].length; i++) {
                            let found = false;
                            for (let j = 0; j < stock[element].length; j++) {
                                console.log(stock[element][j])
                                if (stock[element][j].product.toLowerCase() === data[element][i].product.toLowerCase()) {
                                    found = true;
                                    let dataTemp = parseFloat(data[element][i].qty);
                                    let stockTemp = parseFloat(stock[element][j].qty);
                                    stock[element][j].qty = stockTemp + dataTemp;
                                }
                            }
                            // product not found in array
                            if (found === false) {
                                stock[element].push(data[element[i]]);
                            }
                        }
                    }

                })
                db.collection("stock").doc("hub1").set({
                    name:"hub1",
                    incharge:"X Men",
                    stock:stock
                }).then(()=>{
                    
                    alert("Form Uploaded");
                })

            }
        })
    }
    componentWillMount() {
        if (!this.props.auth)
            this.props.history.push("/");
    }
    render() {
        console.log(this.state.data)
        return (
            <section id="Sales_Entry" className="Sales_Entry">
                <div style={{ marginBottom: "20px;" }}>
                    <h1>Stock Received</h1>
                </div>
                <div style={{ margin: "30px" }}>
                    <TopInfo />
                </div>
                <div className="headers">
                    <h5>Category</h5>
                    <h5>Sub-Category</h5>
                    <h5>UOM</h5>
                    <h5>Packing</h5>
                    <h5>Quantity</h5>
                    <h5>Total</h5>
                </div>
                <div className="sales-entry-top">
                    {this.state.data.map((each, index) => eachRow(index,this.removeIndex,this.state.hub1, this.state.data[index].category, this.state.data[index].qty, (e) => this.setSelectValue(e, index)))}
                </div>
                <div>
                    <Button value="Add Item" func={this.addNewToData} />
                </div>
                <div style={{ marginTop: "20px" }}>
                    <Button value="Submit" func={this.upDateToFirebase} />
                </div>
            </section>
        )
    }
}

export default StockReceived;