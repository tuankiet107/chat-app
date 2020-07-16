import React, { Component } from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class App extends Component{

    render(){
        let result = '/login';
        let user = localStorage.getItem('user');
        if(user){
            result = '/dashboard'
        }

        return (
          <div className="app">
            <header>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">ChatApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#about">About App</Nav.Link>
                            <Nav.Link href="#contact">Contact Us</Nav.Link>
                        </Nav>
                        <div className="d-flex">
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/signup" className="btn btn-dark">Sign Up</Link>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </header>

            <div className="content">
                <h1>Web chat app</h1>
                <Link to={result} id="custom-button-wrapper">get started</Link>
            </div>

            {/* <footer>
                Copyright
            </footer> */}
          </div>
        );
    }
}

export default App;