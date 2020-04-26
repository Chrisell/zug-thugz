import React from 'react';
import './Page.css'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

function itemFormatter(cell, row) {
    var link = "https://vanillawowdb.com/?item=" + row.item_id
    return (
        <a target="_blank" href={link}>{cell}</a>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch('https://48ay6hn8rd.execute-api.us-east-1.amazonaws.com/test/graph/items')
            .then(res => res.json())
            .then(
                (result) => {
                    if (this.props.player) {
                        console.log(this.props.player)   
                    }
                    this.setState({items: result})
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    

    render() {
        const columns = [
            {
                dataField: 'location',
                text: 'Location',
            },
            {
                dataField: 'name',
                text: 'Item Name ',
                formatter: itemFormatter
            },
            {
                dataField: 'boss',
                text: 'Boss ',
                filter: textFilter()
            }, 
            {
                dataField: 'gp',
                text: 'Gear Points',
                sort: true
            }, 
            {
                dataField: 'ilvl',
                text: 'Item Level',
                sort: true
            },
            {
                dataField: 'item_id',
                text: 'Item ID'
            }
        ];
        return (
            this.state.items.length === 0 ?
                <h2>Loading</h2>
                :
                <div>
                    <BootstrapTable classes="table table-bordered table-dark" keyField='item_id' data={this.state.items} columns={columns} filter={filterFactory()} />
                </div>

        )
    }

}

export default Page;
