import React from 'react';
import './Menu.css';

class Menu extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
       
    componentDidMount(){
       
    }

    render() {
        return(
            <div className="menuContainer">
                <button className="menuButton">Upload</button>
                <button className="menuButton">Dashboard</button>
            </div>
        )
    }
}

export default Menu;
