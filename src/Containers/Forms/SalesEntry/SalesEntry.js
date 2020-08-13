import React from 'react';
import TopInfo from "../../../Components/TopInfo/TopInfo";
import "./SalesEntry.css";
import Button from "../../../Components/Button/Button";
import { db } from "../../../firebase";
function eachRow(data, currentKey, value, selectChange) {
    data = data.data;
    const keys = Object.keys(data);
    console.log(data, keys, currentKey, data[currentKey]);
    return (
        <div className="sales-entry-each-row" key={Math.random()}>
            <select name="category" onChange={selectChange}>
                {keys.map(each => <option value={each} key={each}>{each}</option>)}
            </select>
            <select name="product" onChange={selectChange}>
                {data[currentKey].map(each => <option value={each} key={each + Math.random()}>{each}</option>)}
            </select>

            <select name="uom" onChange={selectChange}>
                <option value="1">500 gram</option>
                <option value="2">200 Gram</option>
            </select>
            <input name="qty" type="text" placeholder="Quantity" value={value} onChange={selectChange} />
        </div>
    )
}
class SalesEntry extends React.Component {
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
        copy.push({ category: "first", product: "first", uom: 1, qty: 0 });
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
                console.log('error while fetching', err);
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
    upDateToFirebase = () => {
        console.log("hERE")
        let data = this.converArrayIntoObjectClassify(this.state.data);
        this.fetchFromFirebase("entry", "hub1", (prevData) => {
            if (prevData.entry === undefined)
                prevData = [];
            else
                prevData = prevData.entry;
            

            prevData.push({ data: data, date: this.state.date });
            console.log(prevData)
            db.collection("entry").doc("hub1").set({
                name: "hub1",
                incharge: "X Men",
                entry: prevData
            })
        })
        this.fetchFromFirebase("stock", "hub1", (prevData) => {
            if (prevData === {}) {
                alert("Stock not available");
            }
            else {
                const stock = prevData.stock;
                console.log(stock)
                let keys=Object.keys(data);
                keys.forEach(element=>{
                    let entrya=data[element];
                    for(let i=0;i<stock[element].length;i++)
                    {
                        for(let j=0;j<entrya.length;j++)
                        {
                            if(entrya[j].product===stock[element][i].product)
                            {
                                let salesValue=parseFloat(entrya[j].value);
                                let stockValue=parseFloat(stock[element][j].value);
                                stock[element][i].value=stockValue-salesValue;
                            }
                        }
                    }
                })
                console.log(stock);
            }
        })
    }
    render() {
        console.log(this.state.data)
        return (
            <section id="Sales_Entry" className="Sales_Entry">
                <div style={{ marginBottom: "20px" }}>
                    <h1>Sales Entry</h1>
                </div>
                <div style={{ margin: "30px" }}>
                    <TopInfo />
                </div>
                <div className="sales-entry-top">
                    {this.state.data.map((each, index) => eachRow(this.state.hub1, this.state.data[index].category, this.state.data[index].qty, (e) => this.setSelectValue(e, index)))}
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

export default SalesEntry;