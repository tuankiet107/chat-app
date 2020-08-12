import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Form, FormControl, Button, Row, Col, ListGroup, InputGroup} from 'react-bootstrap';

const firebase = require('firebase');

class ListUser extends Component {
    constructor(){
      super();
      this.state = {
        email: null,
        isFormVisible: false
      }
    }

    Logout = () => {
        const {history} = this.props;
        firebase.auth().signOut()

        localStorage.removeItem('user')
        history.push('/')
    }

    onSelectChat = (index) => {
      this.props.selectedChat(index);
      this.setState({
        color: '#ccc'
      })
    }

    newChat = () => {
      this.setState({
        isFormVisible: !this.state.isFormVisible
      })
    }

    chatWithUser = (e) => {
      this.setState({
        email: e.target.value
      })
    }

    handNewChat = (e) => {
      e.preventDefault();
      this.props.newChatProps(this.state.email);

      document.getElementById('chat-with-user').value = '';
    }

    userSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;

    render() {
        return (
          <Col className="col-left" md={4} lg={4}>

            <Row className="header-left">
              <Col lg="4" md="8" sm="8" xs="8">
                <i className="fas fa-user-circle"></i>
              </Col>
              <Col lg="4" md="4" sm="4" xs="4">
                <button className="btn-logout" onClick={this.Logout}> Logout </button>
              </Col>
              <Col lg="4" md="12"><button className="btn-new-chat" onClick={this.newChat}>New Chat</button></Col>
            </Row>

            { 
              this.state.isFormVisible ?              
                <Form onSubmit={this.handNewChat}>
                  <InputGroup>
                    <FormControl id="chat-with-user" type="text" placeholder="User email" onChange={this.chatWithUser} />
                    <Button type="submit" variant="primary">Chat</Button>
                  </InputGroup>
                </Form> : ''
            }

            <div className="view-users">
              <ListGroup>
                {this.props.chats.map((chat, index) => {
                  return (
                    <ListGroup.Item
                      key={index}
                      onClick={() => this.onSelectChat(index)}
                    >
                      <div className="avatar">
                        {
                          chat.users
                            .filter((user) => user !== this.props.userEmail)[0]
                            .split("")[0]
                        }
                      </div>
                      <span>
                        {chat.users.filter(
                          (user) => user !== this.props.userEmail
                        )}
                      </span>

                      {
                        chat.receiverHasRead === false && !this.userSender(chat) ? 
                        <span style={{marginLeft: 'auto', color: 'red'}}>New</span> : ''
                      }
                      
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </div>
          </Col>
        );
    }
}

export default withRouter(ListUser);
