import React from "react";
import PieChart from "../../Components/Chart/Chart";
import TableRender from "../../Components/TableRender/TableRender";
import "./Dashboard.css";
import TopInfo from "../../Components/TopInfo/TopInfo";
import {db} from "../../firebase";




class Dashboard extends React.Component {
  state = {
    total:0,
    formType:"stocka",
    data2: [
      { name: "Chicken", colour: "Red", value: 55 },
      { name: "Mutton", colour: "Yellow", value: 12 },
      { name: "Boneless", colour: "Blue", value: 23 },
      { name: "Butter Chicken", colour: "Orange", value: 45 },
      { name: "Chicken Tangri", colour: "Green", value: 35 },
      { name: "Chicken Lollipop", colour: "Violet", value: 6 },
      { name: "Chicken Kabab", colour: "Indigo", value: 17 },
    ],
    tableData: {
      headings: ["Category", "Product", "uom", "Quantity","Total"],
      data: [],
    },
    hub:"hub1"
  };
  sortedForm=(data)=>{
    let copy=[...data];
    copy.sort((a,b)=>{
      return -a.value+b.value;
    })
    return copy;
  }
  componentWillMount(){
    // if(!this.props.auth)
    // this.props.history.push("/");
  }
  componentDidMount(){
    this.generateValues("stock","hub1","stock",["Category","Product","uom","Quantity","Total"],"stocka",true,true)
  }
  generateValues=(collection,doc,dataName,headers,temp,allow,isSales)=>{
    console.log(collection,doc,dataName,headers,temp,allow)
    db.collection(collection).doc(doc).get()
    .then(data=>{
      let copy;
      if(isSales)
      {
        copy=data.data()[dataName];
      }
      else
      {
      copy=data.data()[dataName];
      copy=copy[copy.length-1].data
      }
      
      console.log(copy)
      let toSet=[];
      let keys=Object.keys(copy);
      let sumPair=[];
      let colors=["red","green","blue","orange","pink","yellow","purple","brown"];
      let counter=0;
      let summer=0;
      let total=0;
      keys.forEach(key=>{
        summer=0;
        for(let i=0;i<copy[key].length;i++)
        {
          let temp=parseFloat(this.props.uom[copy[key][i].uom].value)*parseFloat(copy[key][i].qty)
          summer+=temp;
          toSet.push({category:key,subCategory:copy[key][i].product,UOM:this.props.uom[copy[key][i].uom].name,quantity:parseFloat(copy[key][i].qty),total:temp})
        }
        total+=summer;
        sumPair.push({name:key,colour:colors[counter++],value:summer})
      })
      console.log(toSet)
      if(allow)
      this.setState({data2:sumPair,total:total,tableData:{headings:headers,data:toSet},formType:temp})
      else
      this.setState({tableData:{headings:headers,data:toSet},formType:temp})

    })
    .catch(err=>{
      alert("check your internet connection",err);
    })
  }
  setSelect=(e)=>{
    let temp={};
    temp[e.target.name]=e.target.value;
    let collection="";
    let doc=this.state.hub;
    let data="";
    let headers=["Category","Product","uom","Quantity","Total"];
    if(e.target.value==="stocka")
    {
      collection="stock";
      data="stock";
    }
    else if(e.target.value==="stockr")
    {
      collection="received";
      data="received";
    }
    else if(e.target.value==="hub")
  {
    collection="transfer";
    data="transfer";
  }
  else if(e.target.value==="return")
  {
    collection="return";
    data="return";
  }
  else if(e.target.value==="sales")
  {
    collection="entry";
    data="entry"
  }
    this.generateValues(collection,doc,data,headers,e.target.value,false,e.target.value==="stocka")
    // this.setState(temp);
  }
  onHubChange=(e)=>{
    this.setState({hub:e.target.value});
  }
  render() {
    return (
      <main>
        <h1 style={{ marginBottom: "30px" }}>Dashboard</h1>
        <div style={{margin:"20px"}}>
        <TopInfo date={new Date()} hub="hub1" incharge="X Men" setDate={(dt)=>console.log(dt)}/>
        </div>
        
        
        <div className="chart__section">
          <div className="total__heading">
            <div>Total</div>
            <div>{this.state.total} Kg</div>
          </div>
          <div
            className="lower__section"
            style={{ position: "relative", height: "100%", width: "80vw" }}
          >
            <div className="left__section">
              <PieChart data={this.state.data2} />
            </div>
            <div className="right__section">
              {this.sortedForm(this.state.data2).map((each) => {
                return (
                  <div key={each.colour} className="each__box">
                    <div
                      className="color__box"
                      style={{ backgroundColor: `${each.colour}` }}
                    >
                      &nbsp;
                    </div>
                    <div className="value__box">
                      <div className="item__name">{each.name}</div>
                      <div className="item__value">{each.value} </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="Dashboard-Controls">
              <div className="Dashboard-Controls-Each">
                <h3>Choose Form</h3>
                <select name="formType" value={this.state.formType} onChange={this.setSelect}>
                  <option value="hub">Hub Transfer</option>
                  <option value="return">Return From Hub</option>
                  <option value="sales">Sales Entry</option>
                  <option value="stocka">Stock Available</option>
                  <option value="stockr">Stock Received</option>
                </select>
              </div>
              <div className="Dashboard-Controls-Each">
                <h3>Choose Hub</h3>
                <select name="hub" >
            {this.props.allhubs.map(each=><option value={"hub"+each.value} key={each.name}>{each.name}</option>)}
                </select>
              </div>
        </div>
        <TableRender data={this.state.tableData}/>
      </main>
    );
  }
}

export default Dashboard;
