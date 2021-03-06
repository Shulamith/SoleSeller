import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme,  ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import './InventoryTwo.css';

export default function InventoryTwo() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = (key) => {
        setExpandedId(expandedId === key ? -1 : key);
    };
      useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await axios.get('/inventory', {
            headers: {
                authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        });
        
        setItems(data.data.items);
    };

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));

      const [expandedId, setExpandedId] = React.useState(-1);

      const theme = createTheme({
        palette: {
          primary: {
            main: '#ff0000',
          },
          secondary: {
              main: '#808080',
          },
        },
        });

    function calculateFees(price) {
        return price / 10;
    }
    return (
        <div className="InventoryTwo">
            <table id="display">
                <tr>
                    {items.map((val, key) => {
                        return (
                            <div className="card">
                            <Card sx={{ maxWidth: 345 }} >
                            <CardMedia
                                component="img"
                                image={val.image}
                                alt='image'
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {val.item}
                            </Typography>
                              <Typography paragraph>
                              Description: {val.description}
                              <br></br>
                              <Typography paragraph> Ebay Price: <EditText defaultValue={val.ebayPrice}/></Typography>
                              <Typography paragraph> Etsy Price: <EditText defaultValue={val.etsyPrice}/></Typography>                              
                              <Typography paragraph>Ebay Fees: ${((val.ebayPrice)*(.1255)-(.30)).toFixed(2)}</Typography>
                              <Typography paragraph>Ebay Profit: ${((val.ebayPrice)-((val.ebayPrice)*(.1255)-(.30)).toFixed(2))}</Typography>
                              <Typography paragraph>Etsy Fees: ${((val.etsyPrice)*(.05)-(.20)).toFixed(2)}</Typography>
                              <Typography paragraph>Etsy Profit: ${(val.etsyPrice-(((val.etsyPrice)*(.05)-(.20)).toFixed(2))).toFixed(2)}</Typography>
                            </Typography>
                            </CardContent>
                            <CardActions disableSpacing>

                            </CardActions>
                            </Card>
                            </div>
                        );
                    })}
                </tr>     

                        <footer>
                            <h3>Want to post a new listing?</h3>
                            <Box textAlign = 'center'>
                            <Button variant ="contained" block size="lg" >
                                <Link to="/upload">Click Here</Link>
                            </Button>
                            </Box>
                            &nbsp;
                        </footer>
                
            </table>
        </div>
    );
}