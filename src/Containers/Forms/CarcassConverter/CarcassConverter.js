import React from 'react';
import "./CarcassConverter.css";
import TopInfo from "../../../Components/TopInfo/TopInfo";
import Button from "../../../Components/Button/Button";

function formGenerator(data,show,func){
    return (
        <div key={data.name} className="form-generator">
            <p>{data.name}</p>
            <input type="text" onChange={func} value={data.value} name="inputForGiven"/>
            <input disabled type="text" value={show?data.info:""} name="ValueForGiven"/>
        </div>
    )
}



class Dashboard extends React.Component {
    state = {
        hub:"hub1",
        name:"",
        show:false,
        total:0.0,
        formRender:[
            {
                name:"Carcass Total Wastage",
                value:0.0,
                info:0.0
            },
            {
                name:"Bone In",
                value:0.0,
                info:0.0
            },
            {
                name:"Boneless",
                value:0.0,
                info:0.0
            },
            {
                name:"Keema",
                value:0.0,
                info:0.0
            },
            {
                name:"Chops",
                value:0.0,
                info:0.0
            },
            {
                name:"Soup Bone",
                value:0.0,
                info:0.0
            },
            {
                name:"Ceena",
                value:0.0,
                info:0.0
            },
            {
                name:"Heart/Kidney",
                value:0.0,
                info:0.0
            }
        ]
    }
    changeFormAtIndex=(e,index)=>{
        let copy=[...this.state.formRender];
        console.log(copy,e.target.value);
        copy[index].value=e.target.value;
        this.setState({formRender:copy});
    }
    submitForm=()=>{
        let total=parseFloat(this.state.total);
        let copy=[...this.state.formRender];
        copy[0].info=total- parseFloat(copy[0].value);
        let useable=copy[0].info;
        for(let i=1;i<copy.length;i++)
        {
            copy[i].info= ((parseFloat(copy[i].value)*100)/useable).toFixed(2)+"%";
        }
        this.setState({formRender:copy,show:true});
    }
    handleOptionChange=(e)=>{
        let obj={};
        obj[e.target.name]=e.target.value;
        this.setState({obj});
    }
    render() {
        return (
            <section id="CarCass_Converter">
                <div>
                    <TopInfo />
                </div>
                <div className="Carcass-converter-option">
                    <div className="Carcass-converter-option-div">
                        <h3>Choose Category</h3>
                        <select name="hub" onChange={this.handleOptionChange}>
                            <option defaultChecked value="mutton">Mutton Carcass</option>
                            <option value="chicken">Whole Chicken</option>
                            <option value="fish">Fish</option>
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
                        <h3>Choose Category</h3>
                        <input onChange={(e)=>{this.setState({total:e.target.value})}} value={this.state.total} type="text" id="weight" name="weight" placeholder="Enter Weight"/>
                    </div>
                </div>
                <div className="Carcass-Generated-Form">
                    {this.state.formRender.map((each,index)=>formGenerator(each,this.state.show,(e)=>this.changeFormAtIndex(e,index)))}
                </div>
                <div className="Carcass-button-holder">
                    <Button value="Submit" func={this.submitForm}/>
                </div>
            </section>
        )
    }
}

export default Dashboard;