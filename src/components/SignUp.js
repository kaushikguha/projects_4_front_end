import React from "react";

export default function SignUp(props){

      console.log(props)
        return (
            <form onSubmit={props.register}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Social Security Number</label>
                    <input name='ssn' type="text" className="form-control" placeholder="SSN" />
                </div>

                <div className="form-group">
                    <label>First name</label>
                    <input name='first_name' type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input name='last_name' type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input name= 'email' type="email" className="form-control" placeholder="E-Mail" />
                </div>

                <div className="form-group">
                    <label>User Name</label>
                    <input name= 'username' type="text" className="form-control" placeholder="Username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name='password' type="password" className="form-control" placeholder="Password" />
                </div>

                  <button type="submit" className="btn btn-dark btn-lg btn-block" >Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">log in?</a>
                </p>
            </form>
        );
    }
