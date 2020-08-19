import React from 'react';
import "./CarcassConverter.css";
import TopInfo from "../../../Components/TopInfo/TopInfo";
import Button from "../../../Components/Button/Button";
import {db} from "../../../firebase"

function formGenerator(data, show, func) {

    return (
        <div key={data.product} className="form-generator">
            <p>{data.product}</p>
            <input type="text" onChange={func} value={data.value} name="inputForGiven" />
            <input disabled type="text" value={show ? data.info : ""} name="ValueForGiven" />
        </div>
    )
}



class Dashboard extends React.Component {
    state = {
        categ:"mutton",
        hub: this.props.email,
        name: "",
        show: false,
        total: 0.0,
        date:new Date(),
        formRender:[]
    }
    changeFormAtIndex = (e, index) => {
        let copy = [...this.state.formRender];
        copy[index].qty = e.target.value;
        this.setState({ formRender: copy });
    }
    submitForm = () => {
        let total = parseFloat(this.state.total);
        let copy = [...this.state.formRender];
        copy[0].info = total - parseFloat(copy[0].qty);
        let useable = copy[0].info;
        for (let i = 1; i < copy.length; i++) {
            copy[i].info = ((parseFloat(copy[i].qty) * 100) / useable).toFixed(2) + "%";
        }
        this.setState({ formRender: copy, show: true });
    }
    handleOptionChange = (e) => {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState({ obj });
       
    }
    componentWillMount(){
        if(!this.props.auth)
        this.props.history.push("/");
        if(this.state.formRender.length===0)
        this.setState({formRender:this.generateForm("mutton")});
        // else
        // this.generateForm();
      }
      generateForm=(name)=>{
        let temp=[];
        let dt=[...this.props.category[name]]
        temp.push({
            category:name,
            product:"Wastage",
            uom:2,
            qty:0
        })
        for(let i=0;i<dt.length;i++)
        {
            temp.push({
                category:name.toLowerCase(),
                product:dt[i],
                uom:1,
                qty:0
            })
        }
        return temp;
     
      }
      upDateChoice=(e)=>{
          this.setState({categ:e.target.value,formRender:this.generateForm(e.target.value)});
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
    upDateToFirebase = () => {
        let data = { ...this.converArrayIntoObjectClassify(this.state.formRender.slice(1)) };
        this.fetchFromFirebase("converter", this.props.email, (prevData) => {

            let ttp=prevData.name;
            let ttp2=prevData.incharge;
            if(prevData.transfer===undefined)
            prevData=[];
            console.log("----->",data,this.state.formRender.slice(1));
            prevData.push({ data: data, date: this.state.date,total:this.state.total,wastage:this.state.total-this.state.formRender[0].qty });
            db.collection("converter").doc(this.props.email).set({
                name: ttp,
                incharge: ttp2,
                converter:prevData
            }).then(()=>{
                alert("Form Submitted!");
                this.submitForm()
            })
        })

    }
    fetchFromFirebase = (collection, doc, cb) => {
        db.collection(collection).doc(doc).get().then(data => {
            console.log(data.data());
            cb(data.data());
        })
            .catch(err => {
                alert("Some Error Occured");
                console.log('error while fetching', err, collection, doc);
            })
    }
    render() {
        return (
            <section id="CarCass_Converter">
                <div style={{marginBottom:"20px;"}}>
                    <h1>Carcass Converter</h1>
                </div>
                <div style={{margin:"30px"}}>
                    <TopInfo date={this.state.date}/>
                </div>
                <div className="Carcass-converter-option">
                    <div className="Carcass-converter-option-div">
                        <h3>Choose Category</h3>
                        <select name="categ" value={this.state.categ} onChange={this.upDateChoice}>
                            <option  value="mutton">Mutton Carcass</option>
                            <option value="chicken">Whole Chicken</option>
                            <option value="seafood">SeaFood</option>
                        </select>
                    </div>
                    <div className="Carcass-converter-option-div">
                        <h3>Vender Name</h3>
                        <select name="name" onChange={this.handleOptionChange}>
                            <option defaultChecked value="name">Name1</option>
                            <option value="name2">Name2</option>
                            <option value="name3">Name3</option>
                        </select>
                    </div>
                    <div className="Carcass-converter-option-div">
                        <h3>Original Weight</h3>
                        <input onChange={(e) => { this.setState({ total: e.target.value }) }} value={this.state.total} type="text" id="weight" name="weight" placeholder="Enter Weight" />
                    </div>
                    <div className="Carcass-converter-option-div">
                        <h3>Net Weight</h3>
                        {
                            this.state.formRender.length==0?<input type="text" value="0"/>:<input disabled  value={parseFloat(this.state.total)-parseFloat(this.state.formRender[0].qty)} type="text" id="weight" name="weight" placeholder="Enter Weight" />
                        }
                        
                    </div>
                </div>
                <div className="headers">
                    <h5 style={{marginRight:"280px"}}>Category</h5>
                    <h5>Quantity</h5>
                    <h5 style={{marginLeft:"120px"}}> Percentage</h5>
                </div>
                <div className="Carcass-Generated-Form">
                    {this.state.formRender.map((each, index) => formGenerator(each, this.state.show, (e) => this.changeFormAtIndex(e, index)))}
                </div>
                <div className="Carcass-button-holder">
                    <Button value="Submit" func={this.upDateToFirebase} />
                </div>
            </section>
        )
    }
}

export default Dashboard;