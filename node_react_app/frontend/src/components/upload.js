import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import "./upload.css";

export default function Upload() {
    const [picture, setPicture] = useState("");
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [ebayPrice, setEbayPrice] = useState("");
    const [etsyPrice, setEtsyPrice] = useState("");

    function validateForm() {
        return description.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="Upload">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="picture">
                    <Form.Label>Picture of item</Form.Label>
                    <Form.Control
                        type="picture"
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="itemName">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                        autofFocus
                        type="itemName"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="description">
                    <Form.Label>Item Description</Form.Label>
                    <Form.Control
                        type="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="ebayPrice">
                    <Form.Label>Price for eBay</Form.Label>
                    <Form.Control
                        type="ebayPrice"
                        value={ebayPrice}
                        onChange={(e) => setEbayPrice(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="etsyPrice">
                    <Form.Label>Price for Etsy</Form.Label>
                    <Form.Control
                        type="etsyPrice"
                        value={etsyPrice}
                        onChange={(e) => setEtsyPrice(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}
