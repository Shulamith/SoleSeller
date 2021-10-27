const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const schemas = require('../models/schemas');

router.use(express.urlencoded({ extended: false }));


/* ------------ GET METHODS ------------ */

router.get('/inventory', (req, res) => {
    const str = [{
        "product": "Nintendo Gameboy Advance",
        "channel": "Amazon",
        "username": "tahmid_z"
    }];
    res.end(JSON.stringify(str));
});



/* ------------ POST METHODS ------------ */

router.post('/addProduct', (req, res) => {
    res.end('NA');
});


router.post('/login', (req, res) => {
    
});


router.post('/Register', (req, res) => {
    try {
        const hashedPassword = await (bcrypt.hash(req.body.password, 10));
        const newUser = schemas.Users;
        newUser.push({
            username: req.form.group('Name').control.value,
            email: req.form.getElementById("email"),
            password: hashedPassword
        });
        res.redirect('/login');
    } catch {
        res.redirect('/Register');
    }
    console.log(newUser);
});


module.exports = router;
