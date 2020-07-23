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
      selectedChatWithUser: null
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
                    const id = snapshot.docs.map(doc => doc.id);
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
    const docKey = this.buildDocKey(this.state.chats[0].users.filter(usr => usr !== this.state.email )[0]);
    console.log(docKey)

    // firebase.firestore().collection('todos').doc().set({
    //   messages: [
    //     {message: 'this is first text.', sender: localStorage.getItem('user')}
    //   ],
    //   receiverHasRead: false,
    //   users: [localStorage.getItem('user'), 'thong@gmail.com']
    // })
    
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

  render() {
    return (
      <div className="dash-board">
        <Row>
          <ListUser userEmail={this.state.email} chats={this.state.chats} selectedChat={this.selectedChat}/>

          <ViewChat userCurrent={this.state.email} chat={this.state.chats[this.state.selectedChatWithUser]} submitMessage={this.submitMessage} />
        </Row>
      </div>
    );
  }
}

export default DashboardComponent
