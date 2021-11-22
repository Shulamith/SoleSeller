import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./logout.css";

function onSubmit(e) {
    axios.post('http://localhost:4000/logout')
        .then(function (response) {
            window.location.href = "http://localhost:3000/login";
        })
        .catch(function (error) {
            console.log(error);
        });
};

export default function Logout() {
    return (
        <section>
            <div className="container">
                <h1 className="mt-5">Are you sure you want to log out of your account?</h1>
                <Form action={onSubmit}>
                    <Button type="submit">Click here to confirm</Button>
                </Form>
            </div>
        </section>
    );
}
