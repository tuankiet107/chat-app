import React, { Component } from 'react';
import {Col, Form, FormControl } from 'react-bootstrap';

class ViewChat extends Component {
  constructor(){
    super();
    this.state = {
      message: '',
      sender: '',
    }
  }

  sendMessages = (e) => {
    this.setState({
      message: e.target.value,
      sender: this.props.userCurrent
    })
  }

  handleSend = (e) => {
    e.preventDefault();
    this.props.submitMessage(this.state)

    document.getElementById('textBox').value = ''
  }

    render() {
        let { chat, userCurrent } = this.props;
        
        if(chat === undefined){
            return <Col className="col-right-empty" md={8} lg={8}></Col>
        }else {
            return (
              <Col className="col-right" md={8} lg={8}>
                <div className="header-right">
                  <div id="info-friend">
                    <div className="avatar">
                      {
                        chat.users
                          .filter((_usr) => _usr !== userCurrent)[0]
                          .split('')[0]
                      }
                    </div>
                    <span>
                      {chat.users.filter((_usr) => _usr !== userCurrent)[0]}
                    </span>
                  </div>
                </div>

                <div className="view-chat">
                  {chat.messages.map((msg, index) => ( 
                    <div key={index}>
                      {msg.sender === userCurrent ? 
                          <div className="user-current">{msg.message}</div> : 
                          <div><span>{msg.sender}</span> <div className="user-friend">{msg.message}</div> </div> }
                    </div>
                  ))}
                </div>

                <div className="send-text">
                <Form onSubmit={this.handleSend}>
                  <FormControl type="text" placeholder="..." onChange={this.sendMessages} className="mr-sm-2" id="textBox" />
                  <i className="fas fa-paper-plane" onClick={this.handleSend}></i>
                </Form>
                </div>
              </Col>
            );
        }
    }
}

export default ViewChat
