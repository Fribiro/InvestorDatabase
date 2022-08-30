const express = require('express');
const { Login, Refreshtoken, logout } = require('../controllers/UserAuth');
const router = express.Router();

router.post('/login', Login); 

router.post('/refresh_token', Refreshtoken);

router.post('/logout', logout);

module.exports = router;