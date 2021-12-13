import React, { Component } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@mui/material/CardActions';
import { Grid, Button, Typography } from '@material-ui/core'
import image from "./online-selling-sites.jpg";
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
        const btnstyle={margin:'8px 0'}
        return (
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
           >
            <Card sx={{ maxWidth: 600 }}>
            <form onSubmit={this.onSubmit}>
            <CardMedia
              component="img"
              height="140"
              image={image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Leaving already? Come back soon!
              </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" type='submit' color='primary' variant="contained" style={btnstyle}fullWidth>
                    Confirm Logout
                </Button>
            </CardActions>
            </form>
          </Card>
          </Grid>
        );
    }
}
