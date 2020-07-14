import React from 'react';
import Upload from '../upload/Upload'
import Dashboard from '../dashboard/Dashboard'
import './PageContainer.css';

class PageContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
       
    componentDidMount(){
       console.log(this.props)
    }

    render() {
        let pageContent;
        switch(this.props.activeComponent){
            case "upload":
                pageContent = <Upload></Upload>;
                break;
            case "dashboard":
                pageContent = <Dashboard></Dashboard>;
                break;
            default:
                pageContent = <div>No component passed</div>;
        }

        return(
            <div className="pageContainer">
                {pageContent}
            </div>
        )
    }
}

export default PageContainer;
