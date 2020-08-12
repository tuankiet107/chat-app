import React, { Component } from 'react';
import { Modal, Form, Button, Alert} from 'react-bootstrap';
import {Link, withRouter } from 'react-router-dom';

const firebase = require('firebase');

class LoginComponent extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loginError: ''
        }
    }

    userTyping = (type, e) => {
        switch(type){
            case 'email':
                this.setState({ email: e.target.value });
                break;
            case 'password':
                this.setState({ password: e.target.value });
                break;
            default:
                break;
        }
    }

    handleLogin = (e) => {
        e.preventDefault();
        const { history } = this.props;

        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                history.push('/dashboard')
                localStorage.setItem('user', this.state.email);
            }, err => {
                console.log(err);
                this.setState({ loginError: 'Fail to login user'})
            })
    }

    render() {
        return (
            <div className="sign-in">
                <Modal.Dialog>
                <div className="modal-header">
                    <h4>Login</h4>
                </div>

                <Modal.Body>
                    <Form onSubmit={this.handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Enter Your Email *</Form.Label>
                        <Form.Control type="email" onChange={(e) => this.userTyping('email', e)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Enter Your Password *</Form.Label>
                        <Form.Control type="password" onChange={(e) => this.userTyping('password', e)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" >Login</Button>
                    </Form>
                </Modal.Body>
                {
                    (this.state.loginError) ?
                    <Alert variant="danger">
                        {this.state.loginError}
                    </Alert>
                    : ''
                }
                <Modal.Footer>
                    <Form.Text className="text-muted">
                    Don't Have An Account ?
                    </Form.Text>
                    <Link to="/signup">Sign up</Link>
                </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}

export default withRouter(LoginComponent);
