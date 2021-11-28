import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./login.css";

export default class Login extends Component {
    userData;

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    // Form Events
    onChangeName(e) {
      this.setState({ name: e.target.value })
    }

    onChangeEmail(e) {
      this.setState({
        email: e.target.value,
      })
    }

    onChangePassword(e) {
        this.setState({ 
          password: e.target.value,
        })  
    }

    onSubmit(e) {
        e.preventDefault()

        axios.post('http://localhost:4000/login', {
            email: e.target.email.value,
            password: e.target.password.value
        })
            .then(function (response) {
                window.localStorage.setItem("user", response.data.user);
                window.localStorage.setItem("token", response.data.accessToken);
                window.location.href = "/profile";
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({
            name: '',
            email: '',
            password: ''
        })
    }

    render() {
      const { email, password } = this.state;
      const isEnabled = email.length > 0 && password.length > 0;
      return (
        <div className="Login">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} />
            </div>
            <button id="login" block size="lg" type="submit" className="btn btn-primary btn-block" disabled={!isEnabled}>
                Login
            </button>
          </form>
          <div className="mt-5">
            <Link to="/register" 
              style={{ color: '#FFF' }}>
              Don't have a login? Click Here!
            </Link>
          </div>
        </div>
      );
  }
}
