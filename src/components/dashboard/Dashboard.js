import React, { Component } from 'react';
import {Row} from 'react-bootstrap';

import ListUser from '../users/ListUser';
import ViewChat from '../chats/ViewChat';

import firebase from 'firebase';

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      chats: [],
      newChatWithUser: null,
      selectedChatWithUser: null,
      receiverHasRead: false
    };
  }

  componentDidMount(){
    const {history} = this.props;
    firebase
        .auth()
        .onAuthStateChanged(async user => {
          if(!user){
              history.push('/');
          }else{
            await firebase.firestore().collection('chats')
                  .where('users', 'array-contains', user.email)
                  .onSnapshot(async snapshot => {
                    const chats = snapshot.docs.map(doc => doc.data());
                    await this.setState({
                      email: user.email,
                      chats: chats
                    });
                    console.log(this.state)
                  })
          }
        }) 
  }

  buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

  selectedChat = (index) => {
    console.log('Index: ',index);
    
    this.setState({
      selectedChatWithUser: index
    })
  }

  submitMessage = (data) => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChatWithUser].users.filter(
        (usr) => usr !== this.state.email
      )[0]
    );

    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          message: data.message,
          sender: this.state.email,
          timestamp: Date.now()
        }),
        receiverHasRead: false
      })
       
  }

  newChatFn = async (new_user) => {
    const docKey = this.buildDocKey(new_user);
    console.log(docKey)

    firebase.firestore().collection('users').doc(new_user).get()
    .then( async doc => {
      if(!doc.exists){
        alert('User email is not exit!')
      }else{      
        firebase.firestore().collection('chats').doc(docKey).set({
          messages: [
            {message: 'Hello', sender: this.state.email, timestamp: Date.now()}
          ],
          receiverHasRead: false,
          users: [this.state.email, new_user]
        })
      }
    })

  }

  render() {
    return (
      <div className="dash-board">
        <Row>
          <ListUser 
            userEmail={this.state.email} 
            chats={this.state.chats} 
            selectedChat={this.selectedChat}
            newChatProps={this.newChatFn}
            warningNewMessage={this.state.receiverHasRead}
          />

          <ViewChat 
            userCurrent={this.state.email} 
            chat={this.state.chats[this.state.selectedChatWithUser]} 
            submitMessage={this.submitMessage} 
          />
        </Row>
      </div>
    );
  }
}

export default DashboardComponent
