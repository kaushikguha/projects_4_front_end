import React, { Component } from 'react'

export default class NewForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      amt_paid: '',
      ssn:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange (e) {
    // console.log(event.target.value)
    this.setState({
      amt_paid: e.target.amt_paid.value,
      ssn: e.target.ssn.values
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log(this.props)
    // fetch
    fetch(this.props.baseUrl + '/pmt', {
      method: 'POST',
      body: JSON.stringify({
        amt_paid: e.target.amt_paid.value,
        ssn: e.target.ssn.values
      }),

      headers: {
        'Content-Type': 'application/json'
      }
    }).then( res => {
      return res.json()
    }).then( data => {
      this.props.addPmt(data)
      this.setState({
        amt_paid: '',
        ssn:''
      })
    }).catch (error => console.error({'Error': error}))
  }


  //https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor
  // read more in htmlFor
  render () {
    console.log(this.state.name)
    return (
      <form onSubmit={ (evt) => this.handleSubmit(evt) }>
        <label htmlFor="amt_paid">Amount Paid: </label>
        <input type="text" id="amt_paid" name="amt_paid" onChange={ (evt) => this.handleChange(evt) } value={ this.state.amt_paid } />
        <label htmlFor="amt_paid">SSN: </label>
        <input type="text" id="ssn" name="ssn" onChange={ (evt) => this.handleChange(evt) } value={ this.state.ssn.ssn } />
        <input type="submit" value="Add" />
      </form>
    )
  }
}
