import React, { Component } from 'react'
// import {useTable} from 'react-table';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default class UserPmt extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){

  }

  render(){
    console.log(this.props.pmt)
    return (
      <div>
        <h1> All Payments</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>payment ID</th>
              <th>Amt Paid</th>
              <th>Date</th>
              <th>Email</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {this.props.pmt.map(pmt => {

              return (
                <tr>
                  <td> {pmt.id}</td>
                  <td> {pmt.amt_paid}</td>
                  <td> {pmt.pmt_date}</td>
                  <td> {pmt.ssn.email}</td>
                  <td >
                    <Button variant="danger" onClick={() => this.props.deletePmt(pmt.id)}>DELETE</Button>
                  </td>
                  <td >
                    <Button variant="secondary" onClick={()=>this.props.showEditForm(pmt)}>EDIT</Button>
                  </td>
                </tr>
              )
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

// export default UserPmt
