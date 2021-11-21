import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./register.css";

export default class Register extends Component {
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
            password: ''
        }
    }

    // Form Events
    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        axios.post('http://localhost:4000/register', {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        })
            .then(function (response) {
                window.location.href = "http://localhost:3000/login";
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({
            name: '',
            email: '',
            password: ''
        });

    }


    render() {
        const { name, email, password } = this.state;
        const isEnabled = name.length > 0 && email.length > 0 && password.length > 0;
        return (
            <div className="Register">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <button id="register" type="submit" className="btn btn-primary btn-block" disabled={!isEnabled}>
                        Register
                    </button>
                </form>
            </div>
        )
    }
}
