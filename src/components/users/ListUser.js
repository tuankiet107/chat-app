import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Col, ListGroup} from 'react-bootstrap';

const firebase = require('firebase');

class ListUser extends Component {

    Logout = async () => {
        const {history} = this.props;
        firebase.auth().signOut()

        localStorage.removeItem('user')
        history.push('/')
    }

    onSelectChat = (index) => {
      this.props.selectedChat(index)
    }

    render() {
        // let {chats} = this.props;
        // let result = chats.map(chat => {
        //   return chat.users.filter(user => user !== this.props.userEmail)
        // })
        // console.log(result)

        return (
          <Col className="col-left" md={4} lg={4}>
            <div className="header-left">
              <div id="info-user"></div>
              <button className="btn-logout" onClick={this.Logout}>
                Logout
              </button>
            </div>

            <div className="view-users">
            
              <ListGroup>
                {
                    this.props.chats.map((chat, index) => {
                        return <ListGroup.Item key={index} onClick={() => this.onSelectChat(index)}>
                                <div className="avatar">{chat.users.filter(user => user !== this.props.userEmail)[0].split('')[0]}</div>
                                <span>{chat.users.filter(user => user !== this.props.userEmail)}</span>
                            </ListGroup.Item>;
                    })
                }
              </ListGroup>

            </div>
          </Col>
        );
    }
}

export default withRouter(ListUser);
