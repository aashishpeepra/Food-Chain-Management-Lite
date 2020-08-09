import React from "react";
import {Switch,Route} from "react-router-dom";
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
    render(){
        return (
            <Switch>
                
                <Route path="/forms/carcass" component={Carcass}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/forms/hubtransfer" component={HubTransfer}/>
                <Route path="/forms/deliverysla" component={DeliverySLA}/>
                <Route path="/forms/returnfromhub" component={ReturnFromHub}/>
                <Route path="/forms/salesentry" component={SalesEntry}/>
                <Route path="/forms/stockavailable" component={StockAvailable}/>
                <Route path="/forms/stockreceived" component={StockReceived}/>
                <Route path="/" component={Login}/>
            </Switch>
        )
    }
}