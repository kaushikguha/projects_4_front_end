import React, {Component} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
// import { useHistory } from "react-router-dom"
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserPmt from "./components/UserPmt";
import Home from "./components/Home";
import Logout from "./components/Logout";
import NewPmt from "./components/NewPmt";

console.log (process.env.NODE_ENV)
let baseUrl=""

if(process.env.NODE_ENV=== 'development'){
  baseUrl='http://localhost:8002/api/v1'
} else {
  baseUrl='heroku url here'
}


class App extends Component{

  constructor(props) {
    super(props)
    this.state = {
      pmt:[],
      userLoggedIn: false,
      modalOpen: false,
      pmtToEdit: {},
      currentUser: '',
      page: 'home',
    }
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
        return[]
      }
    }).then(data=> {
      this.setState({
        pmt: data.data,
      })
    })
  }

  loggingUser= async (e) =>{
    // const history= useHistory()
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
        this.props.history.push('/pmt')
        this.getPmt()
        this.setState({userLoggedIn: true})

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
      if (response.status === 200) {
        this.getPmt()
      }
    }
    catch(err){
      console.log('Error =>', err)
    }
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
            ssn: e.target.ssn.value
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
  const copySSN= [...this.state.pmt.ssn.ssn]
  copyPmt.push(newPmt.amt_paid)
  copySSN.push(newPmt.ssn.ssn)
  this.setState({
    amt_paid: copyPmt,
    ssn:copySSN
  })
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
        ssn: pmt.ssn,
        pmtToEdit:pmt
      })
    }

    logout= async (e) =>{
      // const history= useHistory()
      console.log('logging User Out')
      // e.preventDefault()
      const url = this.props.baseUrl + '/users/logout';
      let confLogout = window.confirm("Are you sure you want to sign out?");

      if (confLogout) {
        const url = this.props.baseUrl + '/users/logout';

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
          console.log(this.props.history)
          this.props.history.push('/sign-in')

        }
      }
      catch (err) {
        console.log('Error =>', err)
      }
    }
  }

componentDidMount(){
  this.getPmt()
}

  render(){
    console.log(this.props)
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
                <Route exact path='/newpmt'> <NewPmt/></Route>
                <Route exact path='/logout' component= {()=> <Logout logout={this.logout}/>}/>
                <Route exact path='/pmt' component={() => <UserPmt pmt={this.state.pmt} deletePmt={this.deletePmt} showEditForm={this.showEditForm} />}/>
                <Route exact path='/sign-in' component= {()=> <Login loggingUser={this.loggingUser}/>}/>
                <Route exact path='/register' component={() => <SignUp register={this.register} />}/>

              </Switch>


              {this.state.modalOpen &&

              <form onSubmit={this.handleSubmit}>
                <label>Amount: </label>
                <input name="amt_paid" value={this.state.amt_paid} onChange={this.handleChange}/> <br/>

                <label>SSN: </label>
                <input name="ssn" value={this.state.ssn.ssn} onChange={this.handleChange}/>

                <button>submit</button>

              </form>
            }

            </div>
          </div>
        </div>

    );
  }
  }



export default App;
