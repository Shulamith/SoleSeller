import React, { Component } from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';

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
      console.log(this.state.email),
      console.log(this.state.password)

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
                <TextField label='Email' placeholder='Enter email' value={this.state.email} onChange={this.onChangeEmail} fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' value={this.state.password} onChange={this.onChangePassword} fullWidth required/>
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
