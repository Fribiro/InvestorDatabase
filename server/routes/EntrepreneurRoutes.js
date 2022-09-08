const express = require('express');
const { GetEntrepreneurById, UpdateEntrepreneurProfile, GetAllEntrepreneurs, GetEntrepreneurAddress } = require('../controllers/Entrepreneur');
const { entrepreneurSignup } = require('../controllers/UserAuth');
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

router.post('/entrepreneur-signup', entrepreneurSignup);

router.get('/entrepreneurs', GetAllEntrepreneurs);

router.get('/entrepreneur-dashboard/:id', GetEntrepreneurById);

router.post('/update-entrepreneur/:id', UpdateEntrepreneurProfile);

router.get('/entrepreneur-address/:id', GetEntrepreneurAddress);

router.post("/send_mail", cors(), async (req, res) => {
  let { text, info, date } = req.body;
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: "business@gmail.com",
    subject: "Meeting",
    html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h4>Meeting details</h4>
        <p>Hi, </br>My name is ${text}</p>
        <p>Could we have a meeting on ${date}</p>
        <p>${info}</p>
    
        <p>Kind regards,</br> ${text}</p>
         </div>
    `,
  });
});

module.exports = router; 