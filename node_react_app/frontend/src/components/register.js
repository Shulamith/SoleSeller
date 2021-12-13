import React, { Component } from 'react';
import { Grid,TextField, Button, Typography,Link, InputAdornment } from '@material-ui/core'
import test from './test.gif';
import logo from './logo.png';
import axios from 'axios';
import { Person, AccountCircle, LockRounded } from "@material-ui/icons";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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

        axios.post('/register', {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        })
            .then(function (response) {
                if (response.data.status === "error") { window.alert("A user with that email already exists"); }
                else { window.location.href = "/login"; }
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
    const btnstyle={margin:'8px 0'}
    return(
        <Grid container style={{minHeight: '100vh'}}>
            <Grid item xs={12} sm={6}>
                <img src={test} 
                style={{ width: '100%', height: '100%', objectFit: 'cover'}} 
                alt="brand" />
            </Grid>
            <Grid container item xs={12} sm={6} alignItems="center" direction="column" justify="space-between" style={{padding:10}}>
                <form onSubmit={this.onSubmit}>
                <Card>
                    <CardContent>
                        <div style={{display:'flex', 
                            flexDirection: "column", 
                            maxWidth: 500, 
                            minWidth: 300}}>
                      <Grid container justify="center">
                        <img src={logo}
                        width={200}
                        alt="logo"
                        />
                      </Grid>

                      <h2>Welcome To Sole Seller</h2>
                      <h2>Register as a New User</h2>
                <TextField label='Name' 
                            name='name' 
                            placeholder='Enter Name' 
                            value={this.state.name} 
                            onChange={this.onChangeName} 
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <Person />
                                  </InputAdornment>
                                ),
                            }}                          
                            fullWidth reuqired/>
                <TextField label='Email' 
                            name='email' 
                            placeholder='Enter Email' 
                            type='email' 
                            value={this.state.email} 
                            onChange={this.onChangeEmail} 
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircle />
                                  </InputAdornment>
                                ),
                            }}
                            fullWidth required/>
                <TextField label='Password' 
                            name='password' 
                            placeholder='Enter Password' 
                            value={this.state.password} 
                            onChange={this.onChangePassword} 
                            type='password' 
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                  <LockRounded />
                                </InputAdornment>
                              ),
                            }}
                            fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} disabled={!isEnabled} fullWidth>Register</Button>
                <Typography > Already have an account?
                    <br></br>
                  <Link href="/login" >
                    Click Here To Login
                  </Link>
                </Typography>
                </div>
                </CardContent>
                </Card>
            </form>
        </Grid>
    </Grid>
    )
}
}
