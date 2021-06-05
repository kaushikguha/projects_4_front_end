import React, {Component} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserPmt from "./components/UserPmt";
import Home from "./components/Home";
import Logout from "./components/Logout";
import NewPmt from "./components/NewPmt";
import LoginError from "./components/LoginError";
import RegistrationError from "./components/RegistrationError";


console.log (process.env.NODE_ENV)
let baseUrl=""

if(process.env.NODE_ENV=== 'development'){
  baseUrl='http://localhost:8002/api/v1'
} else {
  baseUrl='https://employeedb-app.herokuapp.com/api/v1'
}


class App extends Component{

  constructor(props) {
    super(props)
    this.state = {
      pmt: [],
      userLoggedIn: false,
      modalOpen: false,
      pmtToEdit: {},
      currentUser: '',
      page: 'home',
    }
  }

  appLogin=()=>{
    const url= baseUrl+ '/users/userloggedin'
    fetch (url, {
      credentials: 'include'
    })
    .then(res=>{
      console.log(res)
      if(res.status===200){
        res.json()
        .then(json=>{
          this.setState({
          userLoggedIn: true,
          currentUser: json,
        })
    })
  }else {
        return {data:[]}
      }
    })
  }

  getPmt=()=>{
    const url = baseUrl + '/pmt/'
    console.log(url)

    fetch(url, {
      credentials: 'include'
    })
    .then(res=>{
      console.log(res)
      if (res.status===200){
        return res.json()
      }
      else {
        return {data:[]}
      }
    }).then(data=> {
      this.setState({
        pmt: data.data,
      })
    })
  }

  deletePmt = async (id) => {
    const url = baseUrl + '/pmt/' + id
    try{
      const response = await fetch( url, {
        method: 'DELETE',
        credentials: "include"
      })
      if (response.status===200){
        const findIndex = this.state.pmt.findIndex(pmt => pmt.id === id)
        const copyPmt = [...this.state.pmt]
        copyPmt.splice(findIndex, 1)
        this.setState({
          pmt: copyPmt
        })
      }
    }
    catch(err){
      console.log('Error => ', err);
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    console.log(this.state.pmtToEdit)
    const url = baseUrl + '/pmt/' + this.state.pmtToEdit.id
    console.log(url)
    try{
      const response = await fetch( url , {
        method: 'PUT',
        body: JSON.stringify({
          amt_paid: e.target.amt_paid.value,
          pmt_date: e.target.pmt_date.value
        }),
        headers: {
          'Content-Type' : 'application/json'
        },
        credentials:"include"
      })

      if (response.status===200){
        const updatedPmt = await response.json()
        const findIndex = this.state.pmt.findIndex(pmt => pmt.id === updatedPmt.data.id)
        const copyPmt = [...this.state.pmt]
        copyPmt[findIndex] = updatedPmt.data
        this.setState({
          pmt: copyPmt,
          modalOpen:false
        })
      }
    }
    catch(err){
      console.log('Error => ', err);
    }
  }

  addPmt = (newPmt) => {
  const copyPmt = [...this.state.pmt.amt_paid]
  const copyPmtDate= [...this.state.pmt.pmt_date]
  copyPmt.push(newPmt.amt_paid)
  copyPmtDate.push(newPmt.pmt_date)
  this.setState({
    amt_paid: copyPmt,
    pmt_date:copyPmtDate
  })
  console.log(this.props.history)
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showEditForm = (pmt)=>{
    this.setState({
      modalOpen:true,
      amt_paid: pmt.amt_paid,
      pmt_date: pmt.pmt_date,
      pmtToEdit:pmt
    })
  }


  loggingUser= async (e) =>{
    console.log('logging User')
    e.preventDefault()
    const url = baseUrl + '/users/login'
    const loginBody={
      username: e.target.username.value,
      password: e.target.password.value
    }
    try {
      const response= await fetch(url, {
        method: 'POST',
        body: JSON.stringify(loginBody),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      })
      console.log(response)
      console.log('Body: ', response.body)

      if (response.status === 200) {
        this.setState({userLoggedIn: true})
        this.props.history.push('/pmt')
        this.getPmt()
      } else {
      this.props.history.push('/loginerror')
    }
  }
    catch (err) {
      console.log('Error =>', err)

    }
  }

  register =async(e) => {
    e.preventDefault()
    const url= baseUrl + '/users/register'
    console.log(e.target.ssn)
    try{
      const response =await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          ssn: e.target.ssn.value,
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          email:e.target.email.value,
          username:e.target.username.value,
          password:e.target.password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 201) {
        this.props.history.push('/sign-in')
      } else {
        this.props.history.push('/registrationerror')
      }
    }
    catch(err){
      console.log('Error =>', err)
    }
  }

  logout= async (e) =>{
    // const history= useHistory()
    console.log('logging User Out')
    // e.preventDefault()
    let confLogout = window.confirm("Are you sure you want to sign out?");

    if (confLogout) {
      const url = baseUrl + '/users/logout';

      try {
        const response = await fetch( url, {
          method: 'GET',
          credentials:"include"
        })
        console.log(response)
        if (response.status === 200) {
          this.setState({userLoggedIn: false})
          this.props.history.push('/sign-in')
        }
      }
      catch (err) {
        console.log('Error =>', err)
      }
    }
  }

  componentDidMount() {
    this.appLogin()
    this.getPmt()
  }

  render(){
    console.log(this.state)
    return (
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/"}>Employee Database</Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                {(this.state.userLoggedIn)
                ?
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/logout"}>Logout</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/newpmt"}>Create a Payment</Link>
                  </li>
                  <li>
                    <Link className="nav-link" to={"/pmt"}>All Payments</Link>
                  </li>
                </ul>
                :
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>Sign up</Link>
                  </li>
                </ul>
              }
              </div>
            </div>
          </nav>
          <div className="outer">
            <div className="inner">
              <Switch>
                <Route exact path='/'> <Home/></Route>
                <Route exact path='/loginerror'> <LoginError/></Route>
                <Route exact path='/registrationerror'> <RegistrationError/></Route>
                <Route exact path='/newpmt' component= {()=> <NewPmt baseUrl={baseUrl} appLogin={this.appLogin} addPmt={this.addPmt} getPmt={this.getPmt}/>}/>
                <Route exact path='/logout' component= {()=> <Logout logout={this.logout} />}/>
                <Route exact path='/pmt' component={() => <UserPmt pmt={this.state.pmt} getPmt={this.getPmt} deletePmt={this.deletePmt} showEditForm={this.showEditForm} appLogin={this.appLogin}/>}/>
                <Route exact path='/sign-in' component= {()=> <Login loggingUser={this.loggingUser}/>}/>
                <Route exact path='/register' component={() => <SignUp register={this.register}/>}/>
              </Switch>
            </div>

              {this.state.modalOpen &&
                <div class='editform'>
                  <form onSubmit={this.handleSubmit}>
                    <table>
                      <tr>
                        <td>
                          <label>Amount: </label>
                        </td>
                        <td>
                          <input name="amt_paid" value={this.state.amt_paid} onChange={this.handleChange}/>
                        </td>
                        <td>
                          <label>Date: </label>
                        </td>
                        <td>
                          <input name="pmt_date" value={this.state.pmt_date} onChange={this.handleChange}/>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button>submit</button>
                        </td>
                      </tr>
                    </table>
                  </form>
                </div>
            }
          </div>
        </div>
    );
  }
}

export default App;
