import React, { Component } from 'react';
import { Grid,TextField, Button, Typography,Link, InputAdornment } from '@material-ui/core'
import test from './test.gif';
import logo from './logo.png';
import axios from 'axios';
import { AccountCircle, LockRounded } from "@material-ui/icons";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';



export default class Login extends Component {
  userData;

  constructor(props) {
      super(props);
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
      e.preventDefault();

      axios.post('/login', {
          email: e.target.email.value,
          password: e.target.password.value
      })
          .then(function (response) {
              if (response.data.status === "error") { window.alert("Incorrect email/password combination. Please try again"); }
              else {
                  window.localStorage.setItem("user", response.data.user);
                  window.localStorage.setItem("token", response.data.accessToken);
                  window.location.href = "/profile";
              }
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
          <Card >
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

                      <h2>Welcome Back!</h2>
                      <h2>Sign In</h2>
                <TextField label='Email' 
                          name='email' 
                          placeholder='Enter email' 
                          type='email' 
                          value={this.state.email} 
                          onChange={this.onChangeEmail} 
                          margin="normal" 
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
                            placeholder='Enter password' 
                            type='password' 
                            value={this.state.password} 
                            onChange={this.onChangePassword} 
                            margin="normal" 
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                  <LockRounded />
                                </InputAdornment>
                              ),
                            }}
                            fullWidth required/>
                <Button type='submit' color='primary' variant="contained" disabled={!isEnabled} style={btnstyle}fullWidth>
                  <Link to="/profile">Sign In</Link>
                </Button>
                <Typography > Do you not have an account? </Typography>
                <Typography>
                  <Link href="/register" >
                    Click Here To Register
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
