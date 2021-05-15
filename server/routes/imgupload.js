const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

router.get("/", (req, res) => {
  let sql = "SELECT * FROM entrepreneurSignup";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    else {
      res.send(results);
      //console.log(results);
    }
  });
});

router.put("/", (req, res) => {
  //let sampleFile;
  ///let uploadPath;

  // name of the input is sampleFile
  const {sampleFile} = req.body;
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).send("No files were uploaded.");
  // }

  //uploadPath = __dirname + "/upload/" + sampleFile.name;

  console.log(sampleFile);

  // Use mv() to place file on the server
  
    //let id = req.body.id;
    let data = {profile_img: req.body.sampleFile}
    let query = db.query(
      'UPDATE entrepreneurSignup SET ?',data,(err, results) => {
        // Once done, release connection
        if (err) throw err;
        else {
          res.send(results);
        }
      }
    );

    // res.send('File uploaded!');
  //});
});

module.exports = router;