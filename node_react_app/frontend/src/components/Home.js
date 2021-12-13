import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import cartoon from './online-selling-sites.jpg';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import './Home.css';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff"
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-taobao-vector-creative-technology-online-shopping-illustration-computer-finger-poster-image_131803.jpg')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em"
    }
  },
  blogsContainer: {
    paddingTop: theme.spacing(3)
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3)
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between"
  },
  author: {
    display: "flex"
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center"
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <div className="Home">
      <AppBar className={classes.appBar} position="static">
      </AppBar>
      <Box className={classes.hero}>
        <Box>Welcome to Sole Seller</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Who We Are
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={cartoon}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    A Sellers Website
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                      We provide a platform for users to be able to sell their products from multiple platforms all on one site.
                      As of now, we are connected with Ebay and Etsy
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://ak.picdn.net/shutterstock/videos/1024060286/thumb/1.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Returning or New User?
                  </Typography>
                  <CardActions>
                    <Button size="small" href="/login">Click Here to Login</Button>
                </CardActions>
                <CardActions>
                    <Button size="small" href="/register">Click Here to Register</Button>
                </CardActions>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
