const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Auth route' });
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;

    res.json({ 
        message: "Test registration",
        username,
        password
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    res.json({
        message: "Test login",
        username,
        password
    });
});

module.exports = router;