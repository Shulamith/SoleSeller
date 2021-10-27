const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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


router.post('/register', (req, res) => {
    
});


module.exports = router;
