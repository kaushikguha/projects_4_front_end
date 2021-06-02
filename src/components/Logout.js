import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


export default class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //
    }
  }


  render () {
     return (
       <div className="container">
        <h1> Thank you for using the app</h1>
        <Button variant="primary" onClick={() => this.props.logout()}>Sign Out</Button>
      </div>
    );
   }
}
