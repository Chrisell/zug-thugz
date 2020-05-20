import React from 'react';
import {
    Form,
    Button,
    Col,
    Row
} from 'react-bootstrap'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter'

import './Player.css'
const postOptions = {
    method: 'post',
};

function itemFormatter(cell, row) {
    var link = "https://vanillawowdb.com/?item=" + row.item_id
    return (
        <a target="_blank" rel="noopener noreferrer" href={link}>{cell}</a>
    );
}

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            isLoading: false,
            options: [],
            new_item:[1]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addItemToNeedList = this.addItemToNeedList.bind(this);
        this.renderLoginForm = this.renderLoginForm.bind(this);
        this.fetchNeededItems = this.fetchNeededItems.bind(this);
    }
    fetchNeededItems = (item_id) => {
        console.log('needed')
        fetch(`https://48ay6hn8rd.execute-api.us-east-1.amazonaws.com/test/graph/all_needs`, {
            method: "post",
            body: JSON.stringify({
                item_id: item_id,
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                },
                (error) => {
                    console.log('error')
                    console.log(error)
                }
            )
    }
    addItemToNeedList = () => {
        const player_name = this.state.player
        const new_item = this.state.new_item[0]
        console.log(new_item)
        fetch(`https://48ay6hn8rd.execute-api.us-east-1.amazonaws.com/test/graph/add_needed_item`, {
            method: "post",
            body: JSON.stringify({
                item_id: new_item.item_id,
                player_name: player_name
            })
        })
            .then(res => res.json())
            .then(
                (_result) => {
                    var joined = this.state.needed_items.concat(new_item);
                    this.setState({
                        needed_items: joined,
                        new_item: []
                    })
                },
                (error) => {
                    console.log('error')
                    console.log(error)
                }
            )
    }

    handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const player_name = event.target['formName'].value
        fetch(`https://48ay6hn8rd.execute-api.us-east-1.amazonaws.com/test/graph/needed?player_name=${player_name}`, postOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        authenticated: true,
                        needed_items: result,
                        player: player_name,
                        options: []
                    })
                },
                (error) => {
                    console.log('error')
                    console.log(error)
                }
            )
    };

    renderLoginForm = () => {
        return (
            <Form variant="dark" className="login" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>In-Game name</Form.Label>
                    <Form.Control type="input" placeholder="Enter Player Name" />
                    <Form.Text className="text-muted" name="player">
                        Please do not use any special characters here.
                        </Form.Text>
                </Form.Group>

                <Form.Group controlId="formPasscode">
                    <Form.Label>Passcode</Form.Label>
                    <Form.Control type="password" placeholder="Passcode" />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit
                    </Button>
            </Form>
        )
    }

    renderSheets = () => {
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
                text: 'Boss '
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
            <div>
                <h1>{this.state.player}</h1>

                <React.Fragment>
                    <Row className="justify-content-md-center">
                        <Col lg="4">
                            <AsyncTypeahead
                                {...this.state}
                                id="item-search"
                                labelKey="name"
                                class=""
                                minLength={3}
                                onChange={(i) => this.setState({ new_item: i })}
                                onSearch={this._handleSearch}
                                placeholder="Search for an item to add"
                                renderMenuItemChildren={(option, props) => (
                                    <p>{option.name}</p>
                                )}
                            />
                        </Col>
                        <Col lg="1">
                            <Button variant="dark" type="submit" onClick={this.addItemToNeedList}>
                                Add Item
                            </Button>    
                        </Col>
                    </Row>
                </React.Fragment>
                <BootstrapTable classes="table table-bordered table-dark" keyField='item_id' data={this.state.needed_items} columns={columns} filter={filterFactory()}></BootstrapTable> />

            </div>            
        )
    }

    _handleSearch = (query) => {
        this.setState({ isLoading: true });
        var lastchar = query.substring(query.length - 1, query.length);
        var nextletter = String.fromCharCode(lastchar.charCodeAt(0) + 1);
        var toitem = query.substring(0, query.length - 1)
        toitem = toitem + nextletter;
        fetch(`https://48ay6hn8rd.execute-api.us-east-1.amazonaws.com/test/graph/search?item_name=${query}&to_item=${toitem}` , postOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoading: false,
                        options: result
                    });
                },
                (error) => {
                    console.log('error')
                    console.log(error)
                }
            )
    }

    render() {
        if (this.state.authenticated) {
            return this.renderSheets()
        } else {
            return this.renderLoginForm()
        }
    }

}

export default Player;
