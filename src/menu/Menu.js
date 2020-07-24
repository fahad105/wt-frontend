import React from 'react';
import './Menu.css';

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        let handler = this.props.activeComponentStateHandler;

        return (
            <div className="menuContainer">
                <button className="menuButton buttonBase" onClick={() => handler("dashboard")}>Dashboard</button>
                <button className="menuButton buttonBase" onClick={() => handler("upload")}>Upload</button>
            </div>
        )
    }
}

export default Menu;
