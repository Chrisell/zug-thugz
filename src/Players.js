import React from 'react';
import filterFactory from 'react-bootstrap-table2-filter'
import BootstrapTable from 'react-bootstrap-table-next';

import Player from './Player.js'
import './css/Players.css'

function fakePlayers() {
    let players = []
    let names = ['Player1', 'Player2', 'Player3', 'Player4', 'Player5']
    names.forEach(function (name) {
        let player = new Player();
        Object.assign(player.state, {race: name, class: name, spec: name, rank: name, name: name})
        players.push(player)
    })
    return players
}

class Players extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: fakePlayers()
        }
    }

    renderSheets = () => {
        const columns = [
            {
                dataField: 'number',
                text: '#',
                sort: true
            },
            {
                dataField: 'name',
                text: 'Name',
                sort: true
            },
            {
                dataField: 'rank',
                text: 'Rank',
                sort: true
            },
            {
                dataField: 'race',
                text: 'Race',
                sort: true
            },
            {
                dataField: 'class',
                text: 'Class',
                sort: true
            },
            {
                dataField: 'spec',
                text: 'Spec',
                sort: true
            }
        ];
        let data = [];
        this.state.players.forEach(function (player, i) {
            console.log(player)
            data.push({number: i + 1, name: player.state.name, race: player.state.race, class: player.state.class,
            spec: player.state.spec, rank: player.state.rank})
          });
        return (
            <BootstrapTable classes="table table-bordered table-dark" keyField='item_id' data={data} columns={columns} filter={filterFactory()}></BootstrapTable>
        )
    }

    render() {
        return this.renderSheets()
    }

}

export default Players;
