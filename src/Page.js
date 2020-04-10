import React from 'react';
import './Page.css'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch('https://hld2u3aup3.execute-api.us-east-1.amazonaws.com/api/items')
            .then(res => res.json())
            .then(
                (result) => {
                    if (this.props.player) {
                        console.log(this.props.player)   
                    }
                    this.setState({items: result['body']})
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
                dataField: 'Location',
                text: 'Location',
            },
            {
                dataField: 'Name',
                text: 'Item Name ',
                filter: textFilter()
            }, 
            {
                dataField: 'Boss',
                text: 'Boss ',
                filter: textFilter()
            }, 
            {
                dataField: 'Slot',
                text: 'Slot ',
                filter: textFilter(),
                sort: true
            }, 
            {
                dataField: 'Type',
                text: 'Type ',
                filter: textFilter()
            },
            {
                dataField: 'DropChance',
                text: 'Drop Chance',
                sort: true
            }
        ];
        return (
            this.state.items.length == 0 ?
                <h2>Loading</h2>
                :
                <BootstrapTable classes="table table-bordered table-dark" keyField='id' data={this.state.items} columns={columns} filter={filterFactory()} />

        )
    }

}

export default Page;
