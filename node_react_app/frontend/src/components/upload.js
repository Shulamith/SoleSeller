import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';
import Form from "react-bootstrap/Form";
import { Typography, TextField } from "@material-ui/core";
import './upload.css';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      itemName: '',
      itemDescription: '',
      EbayPrice: 0,
      EtsyPrice: 0
    };

    this.onImageChange = this.onImageChange.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onEbayChange = this.onEbayChange.bind(this);
    this.onEtsyChange = this.onEtsyChange.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

 
    
// //App = () => {
//     // stop from refreshing page
//      onFormSubmit = (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('productImage', file); // photo same as one in backend
//         const config = {
//             headers: {
//                 'content-type': 'multipart/form-data',
//             },
//         };
//         const url = 'https://localhost:4000/addItem'
//         axios.post('url, formData, config').then((response) => {
//             alert('Image Uploaded Successfully!')
//         }).catch((err) => {
//             console.log('err', err);
//         });
//     };
// //};
  


  onImageChange = (e) => {
      this.setState({ image: e.target.value })
    //   setfile(e.target.files[0]) 
  }

  onItemChange(e) {
    this.setState({ itemName: e.target.value })
  }

  onDescriptionChange(e) {
    this.setState({ itemDescription: e.target.value })
  }

  onEbayChange(e) {
    this.setState({ EbayPrice: e.target.value })
  }

  onEtsyChange(e) {
    this.setState({ EtsyPrice: e.target.value })
  }

  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem('form'));

    if (localStorage.getItem('form')) {
        this.setState({
            image: this.userData.image,
            itemName: this.userData.itemName,
            itemDescription: this.userData.itemDescription,
            EbayPrice: this.userData.EbayPrice,
            EtsyPrice: this.userData.EtsyPrice
        })
    } else {
        this.setState({
            image: null,
            itemName: '',
            itemDescription: '',
            EbayPrice: 0,
            EtsyPrice: 0
        })
    }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('form', JSON.stringify(nextState));
    }

    render() {
        const { image, itemName, itemDescription, EbayPrice, EtsyPrice } = this.state;
        const isEnabled = itemName.length > 0 && itemDescription.length > 0 && EbayPrice > 0 && EtsyPrice > 0;
  return (
    <Form onSubmit={this.onSubmit}>
    <Form method="POST" action="/addItem">
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
   >
    <Card sx={{ maxWidth: 345 }}>
      <Typography gutterBottom variant="h5" component="div" align="center">
          Upload Form,
        </Typography>
      <Typography gutterBottom variant="h5" component="div" align="center">
          List Your Item!
      </Typography>
      <CardActions>
        <Button size="small" variant="contained" component="label">
          Upload Image
          <input
            type="file"
            accept=".jpg, .jpeg, .png" 
            name="productImage"
            hidden
            onChange={this.handleChange}
            />
        </Button>
      </CardActions>
      <CardMedia
        component="img"
        height="140"
        image={this.state.file}
      />
      <CardContent>
        <form>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="Item Name"
          variant="outlined"
          InputProps={{
            inputProps: { 
                minLength: 1 
            }
          }}
          value={this.state.itemName} 
          onChange={this.onItemChange}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          id="outlined-multiline-static"
          multiline
          rows={6}
          type="text"
          label="Item Description"
          variant="outlined"
          value={this.state.itemDescription} 
          onChange={this.onDescriptionChange}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="number"
          InputProps={{
            inputProps: { 
                min: 0 
            }
          }}
          label="Ebay Price"
          variant="outlined"
          value={this.state.EbayPrice} 
          onChange={this.onEbayChange}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="number"
          InputProps={{
            inputProps: { 
                min: 0 
            }
          }}
          label="Etsy Price"
          variant="outlined"
          value={this.state.EtsyPrice} 
          onChange={this.onEtsyChange}
        />
        <br />
        <Button variant="contained" color="primary" disabled={!isEnabled}>
          Upload
        </Button>
      </form>
      </CardContent>
    </Card>
    </Grid>
    </Form>
    </Form>
  );
}
}
export default Upload;
