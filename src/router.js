import React from "react";
import {Switch,Route,Redirect,render} from "react-router-dom";
import Login from "./Containers/Forms/Login/Login";
import Dashboard from "./Containers/Dashboard/Dashboard";
import Carcass from "./Containers/Forms/CarcassConverter/CarcassConverter";
import DeliverySLA from "./Containers/Forms/DeliverySLA/DeliverySLA";
import HubTransfer from "./Containers/Forms/HubTransfer/HubTransfer";
import ReturnFromHub from "./Containers/Forms/ReturnFromHub/ReturnFromHub";
import SalesEntry from "./Containers/Forms/SalesEntry/SalesEntry";
import StockAvailable from "./Containers/Forms/StockAvailable/StockAvailable";
import StockReceived from "./Containers/Forms/StockReceived/StockReceived";;

export default class Router extends React.Component{
    state={
        loggedIn:false,
        hub:null,
        data:{
            chicken:["Curry Cut (Medium)","Curry Cut (Small)","Breast boneless","Tikka cut","Mince","Lolipops","Drumsticks","thigh boneless","Leg Boneless","whole leg","whole chicken skinless","Liver","Gizzard","Wings","Whole Chicken (Skin-On)","Currycut Skin-On (Medium)"],
            eggs:["eggs"],
            mutton:["Lamb curry cut (Bone and boneless","Lamb curry cut (Boneless)","Lamb soup bones","Lamb Keema","Lamb ribs & Chops","Lamb Liver","Lamb Nalli Bones"],
            seafood:["Korameenu fish","Prawns - Medium - without Tail","Frozen prawns","Rohu Fish"],
            oil:["Sneha Rice Bran Oil"," Saphala Sunflower Oil"],
            marinades:["Punjabi Samosa (Veg)","Peri Peri Wings","Chicken Hariyali Kebab","Chicken Malai Kebab","Dragon Chicken","Chicken Tandoori Drumsticks","Labanese Falafel (Veg)","Cheese Corn Nuggets (Veg)","Tandoori Chicken Popcorn","Crunchy Chicken Nuggets","Chilli Garlic Chicken Finger","Crispy Chicken Fries","Chicken Seekh Kebab","Coated Spicy Chicken Wings"],
            petfood:["Chicekn Treat"]
        },
        uom:{
            1:{
                name:"500 grams",
                value:0.5
            },
            2:{
                name:"1 Kg",
                value:1
            },
            3:{
                name:"Half Dozen",
                value:6
            },
            4:{
                name:"1 Dozen",
                value:12
            },
            5:{
                name:"1 Litre",
                value:1
            },
            6:{
                name:"1 Piece",
                value:1
            }
        }
    }
    classifyUom=(e)=>{
        if(e.toLowerCase()==="eggs")
        return 3;
        if(e.toLowerCase()==="oil")
        return 5;
        if(e.toLowerCase()==="petfood")
        return 6;
        if(e.toLowerCase()==="marinades")
        return 6;
        return 1;
    }
    render(){
        console.log(this.props)
        return (
            <Switch>
                <Route path="/" exact render={(props)=><Login {...props} auth={this.props.loggedIn}/>}/>
                
                <Route path="/forms/carcass" render={(props)=><Carcass {...props} classifyUom={this.classifyUom} uom={this.state.uom} category={this.state.data} auth={this.props.loggedIn}/>}/>
                <Route path="/dashboard" render={(props)=><Dashboard {...props} classifyUom={this.classifyUom} uom={this.state.uom} category={this.state.data} auth={this.props.loggedIn}/>}/>
                <Route path="/forms/hubtransfer" render={(props)=><HubTransfer classifyUom={this.classifyUom} uom={this.state.uom} category={this.state.data} {...props} auth={this.props.loggedIn}/>}/>
                <Route path="/forms/deliverysla" render={(props)=><DeliverySLA classifyUom={this.classifyUom} uom={this.state.uom} category={this.state.data} {...props} auth={this.props.loggedIn}/>}/>
                <Route path="/forms/returnfromhub" render={(props)=><ReturnFromHub classifyUom={this.classifyUom} uom={this.state.uom} category={this.state.data} {...props} auth={this.props.loggedIn}/>}/>
                <Route path="/forms/salesentry" render={(props)=><SalesEntry classifyUom={this.classifyUom} uom={this.state.uom} category={this.state.data} {...props} auth={this.props.loggedIn}/>}/>
                <Route path="/forms/stockavailable" render={(props)=><StockAvailable classifyUom={this.classifyUom} uom={this.state.uom} category={this.state.data} {...props} auth={this.props.loggedIn}/>}/>
                <Route path="/forms/stockreceived" render={(props)=><StockReceived classifyUom={this.classifyUom} uom={this.state.uom} category={this.state.data} {...props} auth={this.props.loggedIn}/>}/>
                
            </Switch>
        )
    }
}