import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./logout.css";


export default class Logout extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        axios.delete('/logout', {
        headers: {
            authorization: `Bearer ${window.localStorage.getItem("token")}`
        }
    })
        .then(function (response) {
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("token");
            window.location.href = "/login";
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="Logout">
                <h1 id="confirm">Are you sure you want to log out of your account?</h1>
                <Form onSubmit={this.onSubmit}>
                    <Button id="logout" block size="lg" type="submit" className="btn btn-primary btn-block">Click here to confirm</Button>
                </Form>
            </div>
        );
    }
}