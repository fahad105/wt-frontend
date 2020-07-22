import React from 'react';
import './Dashboard.css';
import 'azure-storage';
import azurestorage from 'azure-storage';
import keys from '../keys/keys.json'; //todo: this is not secure and should be changed for sure lmao, getSASToken in Azure Function, httpTrigger
import { XYPlot, XAxis, YAxis, LineSeries, LineMarkSeries, HorizontalGridLines, VerticalGridLines } from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';

function Entry(props) {
    let weight = props.entry.Weight ? props.entry.Weight._ : "No Weight value detected";
    return (
        <li>{new Date(props.entry.Date._).toDateString()}: {weight}</li>
    )
}

//probably extract this to a separate class component?
function EntryList(props) {
    if (!props.entries) {
        return (<div>Loading...</div>)
    }
    else {
        const data = props.entries.map((entry) => {
            return {
                x: new Date(entry.Date._),
                y: entry.Weight ? entry.Weight._ : null
            }
        });

        return (
            <div>
                <ul>
                    {props.entries.map((entry) => {
                        return <Entry key={entry.RowKey._} entry={entry}></Entry>
                    })}
                </ul>

                <XYPlot
                    xType="time"
                    width={600}
                    height={350}
                    className="xy-plot"
                    yDomain={[87, 93]}
                >
                    <XAxis tickLabelAngle={0} tickFormat={v => `${v.getDate() + "/" + (v.getMonth() + 1)}`} />
                    <YAxis />

                    <VerticalGridLines />
                    <HorizontalGridLines />

                    <LineMarkSeries
                        strokeWidth={2}
                        data={data}
                        curve={'curveMonotoneX'}
                        fill={1}
                    />
                </XYPlot>
            </div>

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
                let sortedArray = result.entries.sort(function (a, b) {
                    return new Date(a.Date._) - new Date(b.Date._);
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
