import React, { Component } from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';

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
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'black'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
          <form onSubmit={this.onSubmit}>
            <Paper elevation={5} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Email' name='email' placeholder='Enter email' type='email' value={this.state.email} onChange={this.onChangeEmail} fullWidth required/>
                <TextField label='Password' name='password' placeholder='Enter password' type='password' value={this.state.password} onChange={this.onChangePassword} fullWidth required/>
                <Button type='submit' color='primary' variant="contained" disabled={!isEnabled} style={btnstyle}fullWidth>
                  <Link to="/profile">Sign In</Link>
                </Button>
                <Typography > Do you not have an account?
                  <Link href="/register" >
                    Click Here To Register
                  </Link>
                </Typography>
            </Paper>
          </form>
        </Grid>
    )
}
}
