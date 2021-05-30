import React from "react";
// import {useTable} from 'react-table';

export default function UserPmt (props) {

// const UserPmt=(props)=>{
  console.log(props)

    return (

      <table>
        <thead>
          <tr>
            <th>payment ID</th>
            <th>Amt Paid</th>
            <th>SSN</th>
            <th>Email</th>
            <th> ""</th>
            <th> ""</th>
          </tr>
        </thead>
        <tbody>
          {props.pmt.map(pmt => {

            return (
              <tr>
                <td> {pmt.id}</td>
                <td> {pmt.amt_paid}</td>
                <td> {pmt.ssn.ssn}</td>
                <td> {pmt.ssn.email}</td>
                <td >
                  <button onClick={() => props.deletePmt(pmt.id)}>DELETE</button>
                </td>
                <td >
                  <button onClick={()=>props.showEditForm(pmt)}>EDIT</button>
                </td>

              </tr>
            )
            })
          }
        </tbody>
      </table>
    )
}

// export default UserPmt
