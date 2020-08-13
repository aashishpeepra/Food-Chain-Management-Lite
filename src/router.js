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
        data:{}
    }
    render(){
        console.log(this.props)
        return (
            <Switch>
                <Route path="/" exact render={(props)=><Login {...props} auth={this.props.loggedIn}/>}/>
                
                <Route path="/forms/carcass" render={(props)=><Carcass {...props} auth={this.props.loggedIn}/>}/>
                <Route path="/dashboard" render={(props)=><Dashboard {...props} auth={this.props.loggedIn}/>}/>
                <Route path="/forms/hubtransfer" render={(props)=><HubTransfer {...props} auth={this.props.loggedIn}/>}/>
                <Route path="/forms/deliverysla" render={(props)=><DeliverySLA {...props} auth={this.props.loggedIn}/>}/>
                <Route path="/forms/returnfromhub" render={(props)=><ReturnFromHub {...props} auth={this.props.loggedIn}/>}/>
                <Route path="/forms/salesentry" render={(props)=><SalesEntry {...props} auth={this.props.loggedIn}/>}/>
                <Route path="/forms/stockavailable" render={(props)=><StockAvailable {...props} auth={this.props.loggedIn}/>}/>
                <Route path="/forms/stockreceived" render={(props)=><StockReceived {...props} auth={this.props.loggedIn}/>}/>
                
            </Switch>
        )
    }
}