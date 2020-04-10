import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Page from './Page.js'
import './Player.css'

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const requestOptions = {
            method: 'post',
            body: JSON.stringify({ 
                // Name: event.target['formName'].value,
                // Passcode: event.target['formPasscode'].value
                Name: 'Ellbot',
                Passcode: '123password'
            })
        };
        fetch('https://hld2u3aup3.execute-api.us-east-1.amazonaws.com/api/players', requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result['Item'])

                    console.log(result.body.Item.Name)
                    this.setState({
                        authenticated: true,
                        player: result.body.Item
                    })
                },
                (error) => {
                    console.log('error')
                    console.log(error)
                }
            )
    };

    renderForm = () => {
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
        return (
            <div>
                <h1>{this.state.player.Name}</h1>
                <Page player={this.state}></Page>
            </div>            
        )
    }

    render() {
        if (this.state.authenticated) {
            return this.renderSheets()
        } else {
            return this.renderForm()
        }
    }

}

export default Player;
