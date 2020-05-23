import React from 'react';
import {
    Form,
    Button,
    Col,
    Row,
    Tab,
    Tabs
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

const whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true}

function itemFormatter(cell, row) {
    var link = "https://vanillawowdb.com/?item=" + row.item_id
    return (
        <a target="_blank" rel="noopener noreferrer" href={link}>{cell}</a>
    );
}

class Player extends React.Component {
    onPress = () => {
        this.setState({
            race: 'Undead'
        })
    }

    getClasses = () => {
        if (this.state.race == 'Orc') {
            return (
                <div>
                    <Button variant="dark" onClick={() => this.setState({class: 'Hunter'})}><img src={classes.hunter} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Rogue'})}><img src={classes.rogue} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Shaman'})}><img src={classes.shaman} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Warlock'})}><img src={classes.warlock} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Warrior'})}><img src={classes.warrior} /></Button>
                </div>
            )
        } else if (this.state.race == 'Tauren') {
            return (
                <div>
                    <Button variant="dark" onClick={() => this.setState({class: 'Hunter'})}><img src={classes.hunter} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Druid'})}><img src={classes.druid} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Shaman'})}><img src={classes.shaman} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Warrior'})}><img src={classes.warrior} /></Button>
                </div>
            )
        } else if (this.state.race == 'Troll') {
            return (
                <div>
                    <Button variant="dark" onClick={() => this.setState({class: 'Hunter'})}><img src={classes.hunter} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Mage'})}><img src={classes.mage} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Priest'})}><img src={classes.priest} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Rogue'})}><img src={classes.rogue} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Shaman'})}><img src={classes.shaman} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Warrior'})}><img src={classes.warrior} /></Button>
                </div>
            )
        } else if (this.state.race == 'Undead') {
            return (
                <div>
                    <Button variant="dark" onClick={() => this.setState({class: 'Mage'})}><img src={classes.mage} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Priest'})}><img src={classes.priest} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Rogue'})}><img src={classes.rogue} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Warlock'})}><img src={classes.warlock} /></Button>
                    <Button variant="dark" onClick={() => this.setState({class: 'Warrior'})}><img src={classes.warrior} /></Button>
                </div>
            )
        }
    }

    getSpecs = () => {
        if (this.state.class == 'Druid') {
            return (
                <div>
                    <Button variant="dark" onClick={() => this.setState({spec: 'Balance'})}><img src={specs.balance} /></Button>
                    <Button variant="dark" onClick={() => this.setState({spec: 'Bear'})}><img src={specs.bear} /></Button>
                    <Button variant="dark" onClick={() => this.setState({spec: 'Feral'})}><img src={specs.feral} /></Button>
                    <Button variant="dark" onClick={() => this.setState({spec: 'Restoration'})}><img src={specs.restoDruid} /></Button>
                </div>
            )
        } else if (this.state.class == 'Hunter') {
            return (
                <div>
                    <Button variant="dark" onClick={() => this.setState({spec: 'DPS'})}><img src={classes.hunter} /></Button>
                </div>
            )
        } else if (this.state.class == 'Mage') {
            return (
                <div>
                    <Button variant="dark" onClick={() => this.setState({spec: 'DPS'})}><img src={classes.mage} /></Button>
                </div>
            )
        } else if (this.state.class == 'Priest') {
            return (
                <div>
                    <Button variant="dark" onClick={() => this.setState({spec: 'Healer'})}><img src={classes.priest} /></Button>
                    <Button variant="dark" onClick={() => this.setState({spec: 'Shadow'})}><img src={specs.shadow} /></Button>
                </div>
            )
        } else if (this.state.class == 'Rogue') {
            return (
                <div>
                    <Button variant="dark" onClick={() => this.setState({spec: 'DPS'})}><img src={classes.rogue} /></Button>
                </div>
            )
        } else if (this.state.class == 'Shaman') {
            return (
                <div>
                    <Button variant="dark" onClick={() => this.setState({spec: 'Elemental'})}><img src={specs.elemental} /></Button>
                    <Button variant="dark" onClick={() => this.setState({spec: 'Enhancement'})}><img src={specs.enhancement} /></Button>
                    <Button variant="dark" onClick={() => this.setState({spec: 'Restoration'})}><img src={specs.restoShaman} /></Button>
                </div>
            )
        } else if (this.state.class == 'Warlock') {
            return (
                <div>
                    <Button variant="dark" onClick={() => this.setState({spec: 'DPS'})}><img src={classes.warlock} /></Button>
                </div>
            )
        } else if (this.state.class == 'Warrior') {
            return (
                <div>
                    <Button variant="dark" onClick={() => this.setState({spec: 'Tank'})}><img src={specs.tank} /></Button>
                    <Button variant="dark" onClick={() => this.setState({spec: 'DPS'})}><img src={classes.warrior} /></Button>
                </div>
            )
        }
    }

    generalTab = () => {
        return (
            <Tab eventKey="general" title="general">
                <h1>{this.state.player}</h1>
                <div>
                    <Button variant="dark" onClick={() => this.setState({race: 'Orc'})}><img src={races.orc} /></Button>
                    <Button variant="dark" onClick={() => this.setState({race: 'Tauren'})}><img src={races.tauren} /></Button>
                    <Button variant="dark" onClick={() => this.setState({race: 'Troll'})}><img src={races.troll} /></Button>
                    <Button variant="dark" onClick={() => this.setState({race: 'Undead'})}><img src={races.undead} /></Button>
                </div>
                <p className="general">Race: {this.state.race}</p>
                {this.getClasses()}
                <p className="general">Class: {this.state.class}</p>
                {this.getSpecs()}
                <p className="general">Spec: {this.state.spec}</p>
                <p className="general">Info:</p>
                <input type="text" value={this.state.value}/>
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
