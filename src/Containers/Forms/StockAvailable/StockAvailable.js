import React from 'react';
import TopInfo from "../../../Components/TopInfo/TopInfo";
import "./StockAvailable.css";
import Category from "../../../Components/UI/Blocks/OuterBlock/OuterBlock";
class StockAvailable extends React.Component{
    state={
        eachStore:{
            hub1:{
                data:{
                    first:[
                        {
                            
                            product:"second",
                            uom:1,
                            qty:32,
                            packing:"vacuum"
                        },
                        {
                            
                            product:"second",
                            uom:1,
                            qty:32,
                            packing:"vacuum"
                        }
                    ],
                    second:[
                        {
                            
                            product:"second",
                            uom:1,
                            qty:32,
                            packing:"vacuum"
                        },
                        {
                            
                            product:"second",
                            uom:1,
                            qty:32,
                            packing:"vacuum"
                        }
                    ],
                }
            },
            hub2:{
                data:{
                    first:[
                        {
                            
                            product:"second",
                            uom:1,
                            qty:32,
                            packing:"vacuum"
                        },
                        {
                            
                            product:"second",
                            uom:1,
                            qty:32,
                            packing:"vacuum"
                        }
                    ],
                    second:[
                        {
                            
                            product:"second",
                            uom:1,
                            qty:32,
                            packing:"vacuum"
                        },
                        {
                            
                            product:"second",
                            uom:1,
                            qty:32,
                            packing:"vacuum"
                        },
                        {
                            
                            product:"second",
                            uom:1,
                            qty:39,
                            packing:"vacuum"
                        }
                    ],
                }
            },
        },
        selectHub:"hub1"
    }
    onSelectChange=(e)=>{
        this.setState({selectHub:e.target.value});
    }
    renderHub=(hub)=>{
        hub=hub["data"]
        const keys=Object.keys(hub);
        let sum=0;
        let categoryPair=[];
        let count=0;
        console.log(keys)
        keys.forEach(element => {
           hub[element].forEach(each => {
               sum+=each["qty"];
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
                    <h1>Inventory</h1>
                </div>
                <div style={{margin:"30px"}}>
                    <TopInfo />
                </div>
            <div className="StockAvailable-select">
                <h2>Select Store</h2>
                <select onChange={this.onSelectChange}>
                    <option defaultChecked value="hub1">Hub1</option>
                    <option value="hub2">Hub2</option>
         
                </select>
            </div>
            <div>
                {this.renderHub(this.state.eachStore[this.state.selectHub]).map(each=><Category data={each}/>)}
            </div>
                
            </section>
        )
    }
}

export default StockAvailable;