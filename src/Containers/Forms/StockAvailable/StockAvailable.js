import React from 'react';
import TopInfo from "../../../Components/TopInfo/TopInfo";
import "./StockAvailable.css";
import Category from "../../../Components/UI/Blocks/OuterBlock/OuterBlock";
import {db} from "../../../firebase"

class StockAvailable extends React.Component{
    state={
        
        selectHub:"hub1",
        stock:{},
        date:new Date()
    }
    componentWillMount(){
        if(!this.props.auth)
        this.props.history.push("/");
      }
      componentDidMount(){
          
              db.collection("stock").doc("hub1").get()
              .then(data=>{
                  console.log(data.data());
                  this.setState({stock:data.data().stock});
              })
         
      }
    onSelectChange=(e)=>{
        this.setState({selectHub:e.target.value});
    }
    renderHub=(hub)=>{
        
        const keys=Object.keys(hub);
        let sum=0;
        let categoryPair=[];
        let count=0;
        console.log(keys)
        keys.forEach(element => {
           hub[element].forEach(each => {
               sum+=parseFloat(each["qty"]);
           }); 
           categoryPair[count]={};
           categoryPair[count]["name"]=element;
           categoryPair[count]["sum"]=sum;
           categoryPair[count]["elems"]=hub[element];
           count+=1;
           sum=0;
        });
        return categoryPair;
    }
    render(){
        console.log()
        return(
            <section id="Stock Available" className="StockAvailable">
            <div style={{marginBottom:"20px;"}}>
                    <h1>Stock Available</h1>
                </div>
                <div style={{margin:"30px"}}>
                    <TopInfo date={this.state.date} />
                </div>
            <div className="StockAvailable-select">
                <h2>Select Store</h2>
                <select onChange={this.onSelectChange}>
                    <option defaultChecked value="hub1">Hub1</option>
                    <option value="hub2">Hub2</option>
         
                </select>
            </div>
            <div>
                {this.renderHub(this.state.stock).map(each=><Category data={each}/>)}
            </div>
                
            </section>
        )
    }
}

export default StockAvailable;