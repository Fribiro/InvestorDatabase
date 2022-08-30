const express = require('express');
const { GetEntrepreneurById, UpdateEntrepreneurProfile } = require('../controllers/Entrepreneur');
const { entrepreneurSignup } = require('../controllers/UserAuth');
const router = express.Router();

router.post('/entrepreneur-signup', entrepreneurSignup);

router.get('/entrepreneur-dashboard/:id', GetEntrepreneurById);

router.post('/update-entrepreneur/:id', UpdateEntrepreneurProfile);

module.exports = router; 