const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

router.get('/forgotPassword', (req, res, next) => {

});

router.post("/forgotPassword", (req, res, next) => {
    const { email } = req.body;

    db.query(
      "SELECT * FROM entrepreneurSignup WHERE email = ?", [email], async (error, results) => {
        
        if (error) {
          console.log(error);
        }
        if (!email) {
          res.status(400).json({
            message: "Email is required",
          });
          return;
        }
        if (results.length === 0) {
          
          res.status(400).json({
            message: "Email doesn't exist",
          });
          return;
        }
        
        if (results.length > 0) {
          const secret = process.env.JWT_SECRET + results.password;
          const payload = {
            email: results.email,
            id: results.id,
          };
          const token = jwt.sign(payload, secret, { expiresIn: "2m" });
          const link = `http://localhost:3002/resetpassword/${results[0].id}/${token}`;
          console.log(results[0].id);
          console.log(link);
          res.status(201).json({ link });

        }
          

        });
});

router.get("/resetPassword/:id/:token", (req, res, next) => {
    const {id, token} = req.params

    db.query(
      "SELECT * FROM entrepreneurSignup WHERE id = ?",
      [req.params.id],
      async (error, results) => {
        if(results.length === 0 ) {
          res.status(400).json({message: "Invalid id"});
          return
        }

        const secret = process.env.JWT_SECRET + results.password;
        try {
          const payload = jwt.verify(token, secret)
          res.status(201).json({
            results,
          });
        } catch (error) {
          console.log(error.message)
          res.send(error.message)
        }
      }
    );
});

router.post("/resetPassword/:id/:token", (req, res, next) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;

  db.query(
      "SELECT * FROM entrepreneurSignup WHERE id = ?",
      [req.params.id],
      async (error, results) => {
      
      if (results.length === 0) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }
      if (password !== confirmPassword) {
          res.status(400).json({
            message: "Passwords do not match",
          });
          return;
      }
        let hashedPassword = await bcrypt.hash(password, 10);

        const secret = process.env.JWT_SECRET + results.password;
        try {
          const payload = jwt.verify(token, secret);

          db.query(
            "UPDATE password FROM entrepreneurSignup WHERE password = ?",
            { password: hashedPassword }, (err, results) => {
              if (err) throw err;
              else {
                console.log(results);
                 res.status(201).json({
                   results,
                 });
              }
            }
          );
        } catch (error) {
          console.log(error.message);
          res.send(error.message)
        }

  });
  if (password !== confirmPassword) {
    res.status(400).json({
      message: "Passwords do not match",
    });
    return;
  }
  
});


module.exports = router;