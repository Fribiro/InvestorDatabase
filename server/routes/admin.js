const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

//get all users
router.get("/users", (req, res) => {
  let sql = "SELECT * FROM entrepreneurSignup";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    else {
      res.send(results)
      console.log(results)
    }
  });
});

//get one user
router.get("/users/:id", (req, res) => {
  let sql = "SELECT * FROM entrepreneurSignup WHERE id= ? ";
  let query = db.query(sql, [req.params.id], (err, results) => {
    if (err) throw err;
    else {
      res.send(results);
      console.log(results);
    }
  });
});

//create a user
router.post("/users", (req, res) => {
  
  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  
  let sql = "INSERT INTO entrepreneurSignup SET ?";
  let query = db.query(sql, data, (err, results) => {
    if (err) throw err;
    else {
      res.send(results);
    }
  });
});

//edit user
router.put("/users", (req, res) => {
  
  const userid = req.body.id;
  let sql ="UPDATE investorSignup SET firstName='" +req.body.firstName +"',lastName='"+req.body.lastName +"', email='" +req.body.email +"', password='" +req.body.password +"' WHERE id="+ userid;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    else {
      res.send(results);
    }
  });
});

//delete user
router.delete("/users/:id", (req, res) => {
  let sql = "DELETE FROM entrepreneurSignup WHERE id= ?";
  let query = db.query(sql, [req.params.id], (err, results) => {
    if (err) throw err;
    else {
      res.send(results);
    }
  });
});

module.exports = router;
