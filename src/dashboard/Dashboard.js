import React from 'react';
import './Dashboard.css';
import 'azure-storage';
import azurestorage from 'azure-storage';
import keys from '../keys/keys.json'; //todo: this is not secure and should be changed for sure lmao, getSASToken in Azure Function, httpTrigger


function Entry(props) {
    let weight = props.entry.Weight ? props.entry.Weight._ : "No Weight value detected";
    return (
        <li>{new Date(props.entry.Date._).toDateString()}: {weight}</li>
    )
}

function EntryList(props) {
    if (!props.entries) {
        return (<div>Loading...</div>)
    }
    else {
        return (
            <ul>
                {props.entries.map((entry) => {
                    return <Entry key={entry.RowKey._} entry={entry}></Entry>
                })}
            </ul>
        )
    }
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getTableEntities = async () => {
        let query = new azurestorage.TableQuery(); //retrieves all
        await this.tableService.queryEntities('WTData', query, null, (error, result, response) => {
            if (!error) {
                console.log(result);
                let sortedArray = result.entries.sort(function (a, b) {
                    return new Date(b.Date._) - new Date(a.Date._);
                });
                this.setState({ entries: sortedArray });
            }
            if (result.continuationToken) {
                query(result.continuationToken);
            }
        });
    }

    async componentDidMount() {
        let tableEndpoint = keys.tableEndpoint
        let tableSas = keys.tableSas
        this.tableService = azurestorage.createTableServiceWithSas(tableEndpoint, tableSas)
        console.log("retrieving table entities...")
        await this.getTableEntities();
    }

    render() {
        return (
            <div className="dashboardContainer">
                Dashboard
                {<EntryList entries={this.state.entries}></EntryList>}
            </div>
        )
    }
}

export default Dashboard;
