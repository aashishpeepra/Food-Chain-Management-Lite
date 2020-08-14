import React from 'react';
import "./CarcassConverter.css";
import TopInfo from "../../../Components/TopInfo/TopInfo";
import Button from "../../../Components/Button/Button";

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
        hub: "hub1",
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
                    <Button value="Submit" func={this.submitForm} />
                </div>
            </section>
        )
    }
}

export default Dashboard;