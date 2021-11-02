import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import "./register.css";


export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
        event.preventDefault();

        console.log(event.target.Name.value);
        console.log(event.target.email.value);
        console.log(event.target.password.value);
    }

    return (
        <div className="Register">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                autoFocus
                type="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
               />
            </Form.Group>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Register
                </Button>
                <Link to="/login" style={{ color: '#FFF' }}>Already have an account?</Link>
          </Form>
        </div>
      );
}
