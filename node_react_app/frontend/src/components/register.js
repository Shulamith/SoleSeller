import React, { Component } from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';

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
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'black'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper elevation={5} style={paperStyle}>
            <form onSubmit={this.onSubmit}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Register</h2>
                </Grid>
                <TextField label='Name' name='name' placeholder='Enter Name' value={this.state.name} onChange={this.onChangeName} fullWidth reuqired/>
                <TextField label='Email' name='email' placeholder='Enter email' type='email' value={this.state.email} onChange={this.onChangeEmail} fullWidth required/>
                <TextField label='Password' name='password' placeholder='Enter password' value={this.state.password} onChange={this.onChangePassword} type='password' fullWidth required/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} disabled={!isEnabled} fullWidth>Register</Button>
                <Typography > Already have an account?
                    <br></br>
                  <Link href="/login" >
                    Click Here To Login
                  </Link>
                </Typography>
            </form>
            </Paper>
        </Grid>
    )
}
}
