import React from 'react';
import TopInfo from "../../../Components/TopInfo/TopInfo";
import "./StockReceived.css";
import Button from "../../../Components/Button/Button";
import { db } from "../../../firebase";
function eachRow(each,index, removeIndex, data,allUom,  selectChange) {
    // data = data.data;
    const keys = Object.keys(data);
    let uomKeys=Object.keys(allUom);
    console.log(allUom,each,each.uom,allUom[each.uom])
    if (each.category!== undefined)
        return (
            <div className="sales-entry-each-row">

                <select name="category" value={each.category} onChange={selectChange}>
                    {keys.map(each => <option value={each} key={each}>{each}</option>)}
                </select>
                <select name="product" value={each.product} onChange={selectChange}>
                    {data[each.category].map(each => <option value={each} key={each}>{each}</option>)}
                </select>
                <select name="uom" value={each.uom}  onChange={selectChange}>
                    {uomKeys.map(each=>{
                        return <option value={each}>{allUom[each].name}</option>
                    })}
                </select>
                <select name="packing" onChange={selectChange}>
                    <option value="vacuum">Vaccum Pack</option>
                    <option value="regular">Regular</option>
                </select>
                <input name="qty" type="text" placeholder="Quantity" value={each.qty} onChange={selectChange} />
                <input name="total" disabled type="text" placeholder="Total" value={parseFloat(each.qty)*parseFloat(allUom[each.uom].value)} />
                <div className="cross" onClick={() => removeIndex(index)}>
                    X
            </div>
            </div>
        )
}
class StockReceived extends React.Component {
    state = {
        data: [],
        date: new Date(),
        selected: []
    }
    addNewToData = () => {
        let copy = [...this.state.data];
        copy.push({ category: "eggs", packing: "vacuum", product: "eggs", uom: 3, qty: 0 });
        this.setState({ data: copy });
    }
    setSelectValue = (e, index) => {
        let copy = [...this.state.data];
        copy[index][e.target.name] = e.target.value;
        this.setState({ data: copy });
    }
    fetchFromFirebase = (collection, doc, cb) => {
        alert(doc)
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
            else if (result[key].qty !== 0)
                result[key].push(element);
        });
        console.log(result);
        return result;
    }
    removeIndex = (index) => {
        let copy = [...this.state.data];
        copy.splice(index, 1);
        this.setState({ data: copy });
    }
    upDateToFirebase = () => {
        let data = { ...this.converArrayIntoObjectClassify(this.state.data) };
        let name,incharge;
        
        this.fetchFromFirebase("received", this.props.email, (prevData) => {
            name=prevData.name;
             incharge=prevData.incharge;
             if(name===undefined)
             name=this.props.email;
             if(incharge===undefined)
             incharge="Temp"
             if(prevData.received!==undefined)
            prevData = prevData.received;
            else
            prevData=[];
            prevData.push({ data: data, date: this.state.date });
            db.collection("received").doc(this.props.email).set({
                name: name,
                incharge:incharge,
                received: prevData
            })
        })
        this.updateInventory(data,name===undefined?this.props.email:name,incharge===undefined?"Temp":incharge)

    }
    updateInventory = (data,name,incharge) => {
        console.log(data)
        this.fetchFromFirebase("stock", name, (prevData) => {
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
                    if (stock[element] === undefined) {
                        stock[element] = data[element];
                    }
                    else {
                        console.log("-->", stock[element])
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
                db.collection("stock").doc(name).set({
                    name: name,
                    incharge: incharge,
                    stock: stock
                }).then(() => {

                    alert("Form Uploaded");
                })

            }
        })
    }
    onCheckBoxChange = (e) => {
        // selected list of categories
        let selects = [...this.state.selected];
        let dt = [...this.state.data];
        // tooggle effect
        let found = false;
        let pos = 0;
        let count = 0;
        selects.forEach(element => {
            if (element.toLowerCase() === e.target.value.toLowerCase()) {
                found = true;
                pos = count;
            }
            count++;
        })
        if (found) {
            let dt2 = [];
            for (let i = 0; i < dt.length; i++) {

                if (dt[i].category.toLowerCase() !== e.target.value.toLowerCase())
                    dt2.push(dt[i])
            }
            dt = dt2;
            selects.splice(pos, 1);
        }
        else {
            let temp = this.props.category[e.target.value.toLowerCase()];
            console.log(this.props.classifyUom(e.target.value),e.target.value)
            for (let i = 0; i < temp.length; i++) {
                dt.push({ category: e.target.value, product: temp[i], uom: this.props.classifyUom(e.target.value), qty: 0 });
                console.log(temp[i]);
            }

            selects.push(e.target.value);
        }
        // change thye state to updated list of selected items
        this.setState({ selected: selects, data: dt });

    }
    componentWillMount() {
        if (!this.props.auth)
            this.props.history.push("/");
    }
    setDate = (e) => {
        console.log(e)
        this.setState({ date: e });
    }
    render() {
        console.log(this.state.data)
        return (
            <section id="Sales_Entry" className="Sales_Entry stk">
                <div style={{ marginBottom: "20px;" }}>
                    <h1>Stock Received</h1>
                </div>
                <div style={{ margin: "30px" }}>
                    <TopInfo hub={this.props.email} incharge={"X Men"} setDate={this.setDate} date={this.state.date} />
                </div>
                <div className="checkboxes">
                    <fieldset>
                        <label htmlFor="chicken">Chicken</label>
                        <input type="checkbox" id="chicken" value="chicken" onChange={this.onCheckBoxChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="mutton">Mutton</label>
                        <input type="checkbox" id="mutton" value="mutton" onChange={this.onCheckBoxChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="seafood">Sea Food</label>
                        <input type="checkbox" id="seafood" value="seafood" onChange={this.onCheckBoxChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="eggs">Eggs</label>
                        <input type="checkbox" id="eggs" value="eggs" onChange={this.onCheckBoxChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="marinades">Marinades</label>
                        <input type="checkbox" id="marinades" value="marinades" onChange={this.onCheckBoxChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="oil">Oil</label>
                        <input type="checkbox" id="oil" value="oil" onChange={this.onCheckBoxChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="petfood">Pet Food</label>
                        <input type="checkbox" id="petfood" value="petfood" onChange={this.onCheckBoxChange} />
                    </fieldset>

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
                    {this.state.data.map((each, index) => eachRow(each,index, this.removeIndex, this.props.category,this.props.uom,  (e) => this.setSelectValue(e, index)))}
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