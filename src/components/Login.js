import React from "react";
export default function Login (props) {
  console.log(props)

    return (
        <form onSubmit={props.loggingUser}>
            <h3>Log in</h3>
            <div className="form-group">
                <label>Username</label>
                <input name= 'username' type="username" className="form-control" placeholder="Enter username" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input name='password' type="password" className="form-control" placeholder="Enter password" />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
  );
}
