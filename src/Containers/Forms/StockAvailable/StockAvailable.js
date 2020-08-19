import React from 'react';
import TopInfo from "../../../Components/TopInfo/TopInfo";
import "./StockAvailable.css";
import Category from "../../../Components/UI/Blocks/OuterBlock/OuterBlock";
import {db} from "../../../firebase"

class StockAvailable extends React.Component{
    state={
        
        selectHub:this.props.email,
        stock:{},
        date:new Date()
    }
    componentWillMount(){
        if(!this.props.auth)
        this.props.history.push("/");
      }
      fetchData(){
          
              db.collection("stock").doc(this.state.selectHub).get()
              .then(data=>{
                  console.log(data.data());
                  let answer=data.data();
                  if(answer.stock===undefined)
                  answer={};
                  else
                  answer=answer.stock;
                  this.setState({stock:answer});
              })
         
      }
      componentDidMount(){
          this.fetchData();
      }
    onSelectChange=(e)=>{
        this.setState({selectHub:e.target.value});
        this.fetchData();
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
        console.log(this.state.stock)
        return(
            <section id="Stock Available" className="StockAvailable">
            <div style={{marginBottom:"20px"}}>
                    <h1>Stock Available</h1>
                </div>
                <div style={{margin:"30px"}}>
                    <TopInfo date={this.state.date} />
                </div>
            <div className="StockAvailable-select">
                <h2>Select Store</h2>
                <select value={this.state.selectHub} onChange={this.onSelectChange}>
                {this.props.allhubs.map(each=><option key={each.name} value={"hub"+each.value}>{each.name}</option>)}
         
                </select>
            </div>
            <div>
                {
                    Object.keys(this.state.stock).length===0? <h2>Stock Not Available</h2> : this.renderHub(this.state.stock).map(each=>{console.log(each);return <Category key={each.name} data={each}/>}) 
                }
                
            </div>
                
            </section>
        )
    }
}

export default StockAvailable;