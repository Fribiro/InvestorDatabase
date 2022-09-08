const express = require('express');
const { GetInvestorById, UpdateInvestorProfile, GetAllInvestors, GetInvestorAddress } = require('../controllers/Investor');
const { investorSignup, } = require('../controllers/UserAuth');
const router = express.Router();

router.post('/investor-signup', investorSignup);

router.get('/investors', GetAllInvestors);

router.get('/investor-dashboard/:id', GetInvestorById);

router.put('/update-investor/:id', UpdateInvestorProfile);

router.get('/investor-address/:id', GetInvestorAddress);

module.exports = router;