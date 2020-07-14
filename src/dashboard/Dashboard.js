import React from 'react';
import './Dashboard.css';
// import keys from '../keys/keys.json'; //todo: this is not secure and should be changed for sure lmao, getSASToken in Azure Function, httpTrigger

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
       
    componentDidMount(){
       
    }

    render() {
        return(
            <div className="dashboardContainer">
                Dashboard
            </div>
        )
    }
}

export default Dashboard;
