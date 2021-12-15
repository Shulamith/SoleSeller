import React, { Component } from 'react';
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./upload.css";

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
    this.uploadHandler = this.uploadHandler.bind(this);
  }


  onImageChange(e) {
      this.setState({ image: e.target.value })
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
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
  onSubmit(e) {
      e.preventDefault();
      console.log("In the function");

      axios.post('/addItem', {
          etsyPrice: e.target.etsyPrice.value,
      })
          .then(function (response) {
              if (response.data.status === "error") { window.alert("A user with that email already exists"); }
              else { window.location.href = "/login"; }
          })
          .catch(function (error) {
              console.log(error);
          });
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productImage', e.target.files[0]); // photo same as one in backend
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };
    const url = 'https://localhost:4000/addItem'
    axios.post('url, formData, config').then((response) => {
        alert('Image Uploaded Successfully!')
    }).catch((err) => {
        console.log('err', err);
    });
    };

    uploadHandler(e) {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        axios.post('/addItem', data)
          .then((res) => {
            this.setState({ photos: [res.data, ...this.state.photos] });
          });
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
            <div className="Upload">
                <Form onSubmit={this.onSubmit}>
                    <Form method="POST" action="/addItem">
                        <div className="form-group">
                            <label>Select Image</label>
                            <input type="file" accept=".jpg, .jpeg, .png" name="myImage" onChange={this.onImageChange} />
                        </div>
                        <div className="form-group">
                            <label>Item Name</label>
                            <input type="text" minLength="1" name="itemName" maxLength="50" className="form-control" value={this.state.itemName} onChange={this.onItemChange} />
                        </div>
                        <div class="form-group">
                            <label>Item Description</label>
                            <textarea class="form-control rounded-0" name="itemDescription"id="exampleFormControlTextarea1" rows="10" input type="text" minLength="1" maxLength="300" className="form-control" value={this.state.itemDescription} onChange={this.onDescriptionChange} />
                        </div>
                        <div className="form-group">
                            <label>Ebay Price</label>
                            <input type="number" min="0" step="any" name="ebayPrice"className="form-control" value={this.state.EbayPrice} onChange={this.onEbayChange} />
                        </div>
                        <div className="form-group">
                            <label>Etsy Price</label>
                            <input type="number" min="0" step="any" name="etsyPrice" zclassName="form-control" value={this.state.EtsyPrice} onChange={this.onEtsyChange} />
                        </div>
                        <Button id="sumbit" type="submit" className="btn btn-primary btn-block" disabled={!isEnabled}>
                            Submit
                        </Button>
                    </Form>
                </Form>
            </div>
        );
    }

}

export default Upload;