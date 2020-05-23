import React from 'react';
import {
    Form,
    Button,
    Col,
    Row,
    Tab,
    Tabs,
    Dropdown,
    DropdownButton
} from 'react-bootstrap'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter'
import * as races from './img/races'
import * as classes from './img/classes'
import * as specs from './img/specs'

import './Player.css'
const postOptions = {
    method: 'post',
};

const defaultString = "------"

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
            new_item:[1],
            race: defaultString,
            class: defaultString,
            spec: defaultString
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addItemToNeedList = this.addItemToNeedList.bind(this);
        this.renderLoginForm = this.renderLoginForm.bind(this);
        this.fetchNeededItems = this.fetchNeededItems.bind(this);
    }

    makeDropdown = (onClick, text) => {
        return (
            <Dropdown.Item variant="dark" onClick={() => this.setState(onClick)}>{text}</Dropdown.Item>
        )
    }

    raceDropDown = () => {
        return (
            <DropdownButton variant="dark" id="raceDropDown" title={this.state.race}>
                {this.makeDropdown({race: 'Orc', class: defaultString, spec: defaultString}, 'Orc')}
                {this.makeDropdown({race: 'Tauren', class: defaultString, spec: defaultString}, 'Tauren')}
                {this.makeDropdown({race: 'Troll', class: defaultString, spec: defaultString}, 'Troll')}
                {this.makeDropdown({race: 'Undead', class: defaultString, spec: defaultString}, 'Undead')}
            </DropdownButton>
        )
    }

    classDropDown = () => {
        if (this.state.race === 'Orc') {
            return (
                <DropdownButton variant="dark" id="classDropDown" title={this.state.class}>
                    {this.makeDropdown({class: 'Hunter', spec: 'DPS'}, 'Hunter')}
                    {this.makeDropdown({class: 'Rogue', spec: 'DPS'}, 'Rogue')}
                    {this.makeDropdown({class: 'Shaman', spec: defaultString}, 'Shaman')}
                    {this.makeDropdown({class: 'Warlock', spec: 'DPS'}, 'Warlock')}
                    {this.makeDropdown({class: 'Warrior', spec: defaultString}, 'Warrior')}
                </DropdownButton>
            )
        } else if (this.state.race === 'Tauren') {
            return (
                <DropdownButton variant="dark" id="classDropDown" title={this.state.class}>
                    {this.makeDropdown({class: 'Hunter', spec: 'DPS'}, 'Hunter')}
                    {this.makeDropdown({class: 'Druid', spec: defaultString}, 'Druid')}
                    {this.makeDropdown({class: 'Shaman', spec: defaultString}, 'Shaman')}
                    {this.makeDropdown({class: 'Warrior', spec: defaultString}, 'Warrior')}
                </DropdownButton>
            )
        } else if (this.state.race === 'Troll') {
            return (
                <DropdownButton variant="dark" id="classDropDown" title={this.state.class}>
                    {this.makeDropdown({class: 'Hunter', spec: 'DPS'}, 'Hunter')}
                    {this.makeDropdown({class: 'Mage', spec: 'DPS'}, 'Mage')}
                    {this.makeDropdown({class: 'Priest', spec: defaultString}, 'Priest')}
                    {this.makeDropdown({class: 'Rogue', spec: 'DPS'}, 'Rogue')}
                    {this.makeDropdown({class: 'Shaman', spec: defaultString}, 'Shaman')}
                    {this.makeDropdown({class: 'Warrior', spec: defaultString}, 'Warrior')}
                </DropdownButton>
            )
        } else if (this.state.race === 'Undead') {
            return (
                <DropdownButton variant="dark" id="classDropDown" title={this.state.class}>
                    {this.makeDropdown({class: 'Mage', spec: 'DPS'}, 'Mage')}
                    {this.makeDropdown({class: 'Priest', spec: defaultString}, 'Priest')}
                    {this.makeDropdown({class: 'Rogue', spec: 'DPS'}, 'Rogue')}
                    {this.makeDropdown({class: 'Warlock', spec: 'DPS'}, 'Warlock')}
                    {this.makeDropdown({class: 'Warrior', spec: defaultString}, 'Warrior')}
                </DropdownButton>
            )
        }
        return (
            <DropdownButton variant="dark" id="classDropDown" title={this.state.class}>
            </DropdownButton>
        )
    }

    specDropDown = () => {
        if (this.state.class === 'Druid') {
            return (
                <DropdownButton variant="dark" id="classDropDown" title={this.state.spec}>
                    {this.makeDropdown({spec: 'Balance'}, 'Balance')}
                    {this.makeDropdown({spec: 'Bear'}, 'Bear')}
                    {this.makeDropdown({spec: 'Feral'}, 'Feral')}
                    {this.makeDropdown({spec: 'Restoration'}, 'Restoration')}
                </DropdownButton>
            )
        } else if (this.state.class === 'Priest') {
            return (
                <DropdownButton variant="dark" id="classDropDown" title={this.state.spec}>
                    {this.makeDropdown({spec: 'Healer'}, 'Healer')}
                    {this.makeDropdown({spec: 'Shadow'}, 'Shadow')}
                </DropdownButton>
            )
        } else if (this.state.class === 'Shaman') {
            return (
                <DropdownButton variant="dark" id="classDropDown" title={this.state.spec}>
                    {this.makeDropdown({spec: 'Elemental'}, 'Elemental')}
                    {this.makeDropdown({spec: 'Enhancement'}, 'Enhancement')}
                    {this.makeDropdown({spec: 'Restoration'}, 'Restoration')}
                </DropdownButton>
            )
        } else if (this.state.class === 'Warrior') {
            return (
                <DropdownButton variant="dark" id="classDropDown" title={this.state.spec}>
                    {this.makeDropdown({spec: 'Tank'}, 'Tank')}
                    {this.makeDropdown({spec: 'DPS'}, 'DPS')}
                </DropdownButton>
            )
        }
        return (
            <DropdownButton variant="dark" id="classDropDown" title={this.state.spec}>
            </DropdownButton>
        )
    }

    generalTab = () => {
        return (
            <Tab eventKey="general" title="general">
                <h1>{this.state.player}</h1>

                <p className="general">Race: {this.raceDropDown()}</p>
                <p className="general">Class: {this.classDropDown()}</p>
                <p className="general">Spec: {this.specDropDown()}</p>
                <p className="general">Note:<br></br><textarea className="note" type="text" rows="6" cols="100" value={this.state.value}/></p>
            </Tab>
        )
    }

    wishListTab = (columns) => {
        return (
            <Tab eventKey="wish list" title="wish list">
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
                <BootstrapTable classes="table table-bordered table-dark" keyField='item_id' data={this.state.needed_items} columns={columns} filter={filterFactory()}></BootstrapTable>
            </Tab>
        )
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
                <Tabs className="tabs" defaultActiveKey="general" transition={false} id="player-tabs">
                    {this.generalTab()}
                    {this.wishListTab(columns)}
                </Tabs>
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
