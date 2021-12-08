import * as React from 'react';
import {useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


const pages = ['Home', 'Inventory', 'Profile','Upload'];
const routes = ['/home','/inventory','/profile','/upload']

const NavBar = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
      { /*
          setInterval was used in order to refresh the page constantly
      in order to have the "logout" button show immediately in place of
      "login", as soon as user logs out.
      */}
      setInterval(() => {
          const user = localStorage.getItem("user");
          setUser(user);
      }, [])
  }, 5000);



if(user)
  return (
    <AppBar position="static" style={{ background: '#483D8B' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Sole Seller
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <a class="nav-link" href="/">
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
          >
            Home
          </Typography></a>
            <a class="nav-link" href="/inventory">
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
          >
            Inventory
          </Typography></a>
          <a class="nav-link" href="/profile">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
          >
            Profile
          </Typography></a>
          <a class="nav-link" href="/upload">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
          >
            Upload
          </Typography>
            </a>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <a class="nav-link" href="/logout">Logout</a>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
if(!user)
    return (
      <AppBar position="static" style={{ background: '#483D8B' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              Sole Seller
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <a class="nav-link" href="/">
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
          >
            Home
          </Typography></a>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <a class="nav-link" href="/login">Login</a>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default NavBar;
