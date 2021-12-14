import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import cartoon from './logo.png';
import Button from '@mui/material/Button';
import ebay from './ebay.png';
import etsy from './etsy.jpg';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import test from './test.gif';
import "./profile.css";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Profile() {

    const User = window.localStorage.getItem("user");
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return(
        <div className="profile">
        <Box className={classes.hero}>
          <Box>Welcome back {User}</Box>
        </Box>
      <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Ebay" {...a11yProps(0)} />
        <Tab label="Etsy" {...a11yProps(1)} />
        <Tab label="Inventory" {...a11yProps(2)} />
        <Tab label="Upload" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Button size="small" image={ebay} href="https://localhost:4000/ebayauth">
            Click Here to Connect to Ebay!
        </Button>
        <img src={ebay} style={{width:100}} alt="ebay" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Button size="small" href="https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=http://localhost:4000/oauth/redirect&scope=listings_w%20shops_r%20shops_w%20email_r%20listings_r&client_id=b397ddo9ov4lu91igrv1rjjc&state=8056a9&code_challenge=-fqDGjHEsuMqqH57qgaopzCacIJLBijMkjlaQv-2HhA&code_challenge_method=S256">
          Click Here to Connect to Etsy!
        </Button>
        <img src={etsy} style={{width:100}} alt="etsy" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Button size="small" href="/inventory">
          Click here to access inventory {User}
        </Button>
        <img src={cartoon} style={{width:100}} alt="cartoon" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Button size="small" href="/upload">
          Click here to post a new listing
        </Button>
        <img src={test} style={{width:100}} alt="upload" />
      </TabPanel>
    </Box>
      </div>
    );
}
