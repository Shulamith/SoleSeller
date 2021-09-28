const express = require('express');
const router = express.Router();

router.get('/inventory', (req, res) => {
    const str = [{
        "product": "Nintendo Gameboy Advance",
        "channel": "Amazon",
        "username": "tahmid_z"
    }];
    res.end(JSON.stringify(str));
});

router.post('/addProduct', (req, res) => {
    res.end('NA');
});

module.exports = router;