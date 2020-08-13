import React from 'react';

class Dashboard extends React.Component{
    state={

    }
    componentWillMount(){
        if(!this.props.auth)
        this.props.history.push("/");
      }
    render(){
        return(
            <h1>Delivery SLA</h1>
        )
    }
}

export default Dashboard;