import React from 'react';
import {
  Form,
  Button,
  Nav,
  Navbar,
  FormControl
} from 'react-bootstrap'
import ReactDOM from 'react-dom';
import './css/index.css';
import App, {tags} from './App';
import * as serviceWorker from './serviceWorker';

function generateNavBar() {
  let links = []
  tags.slice().reverse().forEach(function (tag) {
    links.push(
      <Nav.Link href={"#".concat(tag.link)}>{tag.name}</Nav.Link>
    )
  })
  return (
    <Navbar className="nav" bg="light" expand="lg">
        <Navbar.Collapse className="nav">
            <Nav className="mr-auto">
            {links}
            {/* <NavDropdown title="player">
                <NavDropdown.Item href="#general">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar.Collapse>
    </Navbar>
  )
}

ReactDOM.render(
  <React.StrictMode>
    {generateNavBar()}
    
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
