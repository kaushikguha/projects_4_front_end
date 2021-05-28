import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


export default class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //
    }
  }

  logout= async (e) =>{
    // const history= useHistory()
    console.log('logging User Out')
    // e.preventDefault()
    const url = this.props.baseURL + '/users/logout';
    let confLogout = window.confirm("Are you sure you want to sign out?");

    if (confLogout) {
      const url = this.props.baseURL + '/users/logout';

    try {
      const response = await fetch( url, {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json'
        },
      })
      console.log(response)


      if (response.status === 200) {
        // this.props.history.push('/login')
        // this.logout()
        this.setState({userLoggedIn: false})
        console.log('user logged out')

      }
    }
    catch (err) {
      console.log('Error =>', err)
    }
  }
}


  render () {
     return (
       <div className="container">
         <Button variant="primary" onClick={() => this.logout()}>Sign Out</Button>
      </div>
    );
   }
}
