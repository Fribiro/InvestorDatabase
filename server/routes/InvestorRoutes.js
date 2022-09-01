const express = require('express');
const { GetInvestorById, UpdateInvestorProfile, GetAllInvestors } = require('../controllers/Investor');
const { investorSignup, } = require('../controllers/UserAuth');
const router = express.Router();

router.post('/investor-signup', investorSignup);

router.get('/investors', GetAllInvestors);

router.get('/investor-dashboard/:id', GetInvestorById);

router.post('/update-investor/:id', UpdateInvestorProfile);

module.exports = router;