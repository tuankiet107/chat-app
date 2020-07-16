import React, { Component } from 'react';
import {Row, Col, Image} from 'react-bootstrap';

const firebase = require('firebase');

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount(){
    const {history} = this.props;
    firebase
        .auth()
        .onAuthStateChanged(async user => {
            if(!user){
                history.push('/');
            }else {
                // use database to show all user in Component Views
            }

        }) 
  }

  Logout = async () => {
    const {history} = this.props;
    firebase
        .auth()
        .signOut()
        localStorage.removeItem('user')
        history.push('/')
  }

  render() {
    return (
      <div className="dash-board">
        <Row>
          <Col className="col-left" md={4} lg={4}>
              <div className="header-left">
                  <div id="info-user"></div>
                  <button className="btn-logout" onClick={this.Logout}>Logout</button>
              </div>
              <div className="view-users">

              </div>
          </Col>

          <Col className="col-right" md={8} lg={8}>
            <div className="header-right">
                <Row id="info-friend">
                <Col>
                    <Image src="https://picsum.photos/60/60" roundedCircle />
                </Col>
                </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashboardComponent
