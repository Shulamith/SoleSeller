import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom';
import axios from 'axios';
import ebay from "./ebay.png";
import etsy from "./etsy.jpg";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import "./profile.css";

const useStyles = makeStyles((theme) => ({

    hero: {
      height: "200px",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "top",
      color: "#000",
      fontSize: "4rem",
      [theme.breakpoints.down("sm")]: {
        height: 300,
        fontSize: "3em"
      }
    },
  
  }));

export default function Profile() {
    const classes = useStyles();

    const User = window.localStorage.getItem("user");

    return(
        <section>
      <Box className={classes.hero}>
        <Box>Welcome Back, {User}</Box>
      </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="70"
        image={ebay}
      />
      <CardContent>
            <CardActions style={{justifyContent: 'center'}}>
                <Button size="small" href="https://localhost:4000/ebayauth">
                    Click Here to Connect to Ebay!
                </Button>
            </CardActions>
      </CardContent>
    </Card>
          </Grid>
          <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="70"
        image={etsy}
      />
      <CardContent>
            <CardActions style={{justifyContent: 'center'}}>
                                <Button size="small" href="https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=http://localhost:4000/oauth/redirect&scope=email_r%20address_r%20billing_r%20transactions_r%20listings_r%20listings_w%20listings_d&client_id=b397ddo9ov4lu91igrv1rjjc&state=8056a9&code_challenge=-fqDGjHEsuMqqH57qgaopzCacIJLBijMkjlaQv-2HhA&code_challenge_method=S256">
                    Click Here to Connect to Etsy!
                </Button>
            </CardActions>
      </CardContent>
            </Card>
          </Grid>
          </Grid>
        </section>
    );
}
