import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';



export default class NewForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      amt_paid: '',
      pmt_date:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    // console.log(event.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.appLogin()
    console.log(this.props)
    // fetch
    fetch(this.props.baseUrl + '/pmt/', {
      method: 'POST',
      body: JSON.stringify({
        amt_paid: e.target.amt_paid.value,
        pmt_date: e.target.pmt_date.value
      }),

      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then( res => {
      console.log(res)
      return res.json()
    }).then( data => {
      this.props.getPmt()
      this.setState({
        amt_paid: '',
        pmt_date:''
      })
    }).catch (error => console.error({'Error': error}))
  }


  //https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor
  // read more in htmlFor
  render () {
    console.log(this.props)
    console.log(this.state)
    return (
      <>
        <div >
          <h1> Create new payment</h1>
          <form onSubmit={ (evt) => this.handleSubmit(evt) }>
            <Table striped bordered hover>
              <tr>
                <td>
                  <label htmlFor="amt_paid">Amount Paid: </label>
                </td>
                <td>
                  <input type="text" id="amt_paid" name="amt_paid" onChange={ (evt) => this.handleChange(evt) } value={ this.state.amt_paid } /> <br/>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="pmt_date">Date: </label>
                </td>
                <td>
                  <input required pattern="^\d{2}-\d{2}-\d{4}$" type="text" id="pmt_date" name="pmt_date" placeholder="MM-DD-YYYY" onChange={ (evt) => this.handleChange(evt) } value={ this.state.pmt_date } />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="submit" value="Add" />
                </td>
              </tr>
            </Table>
          </form>
        </div>
      </>
    )
  }
}
