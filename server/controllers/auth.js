const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser")
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../middleware/token");


// TODO: write the dbconnection and import it into the neccessary pages
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

//async makessure the server waits for some actions which might take some time to be done
//login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
        message: "Please provide an email and password",
      });
      return;
    }
    db.query(
      "SELECT * FROM entrepreneurSignup WHERE email = ?",
      [email],
      async (error, results) => {
        //bcryptcompare compares the password being typed with the one in the db
        
        if (
          !results ||
          !(await bcrypt.compare(req.body.password, results[0].password))
        ) {
          res.status(401).json({
            message: "Email or Password is incorrect",
          });
        } else {
          const accesstoken = createAccessToken(results.Id);
          const refreshtoken = createRefreshToken(results.Id);
          
          results.refreshtoken = refreshtoken;
          console.log(results);
          sendRefreshToken(res, refreshtoken);
          sendAccessToken(req, res, accesstoken);
        }
        //res.status(200).json({ message: "Welcome Back" });
      }
    );
  } catch (error) {
    console.log(error);
  } 
};

//signup function for investors
exports.investorsignup = (req, res) => {
  console.log(req.body); 

  const {
    ifirstName,
    ilastName,
    iemail,
    ipassword,
    iconfirmPassword
  } = req.body;

  //hinder sql injection by allowing each person to use only one email address
  db.query('SELECT email FROM investorSignup WHERE email = ?', [iemail], async (error, results) => {
    if (error) {
      console.log(error);
    }
    if (!iemail || !ipassword || !ifirstName || !ilastName) {
      res.status(400).json({
        message: "All fields are required",
      });
      return;
    }
    if (results.length > 0) {
      //prevent use of an email already in the db
      res.status(400).json({
        message: "Email exists",
      });
      return;
    }
    if (ipassword !== iconfirmPassword) {
      res.status(400).json({
        message: "Passwords do not match",
      });
      return;
    }
    //do 10 runds of hashing
    let hashedPassword = await bcrypt.hash(ipassword, 10);

    db.query('INSERT INTO investorSignup SET ?', {
      firstName: ifirstName,
      lastName: ilastName,
      email: iemail,
      password: hashedPassword
    }, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        //console.log(results);
        res.status(201).json({
          results,
        });
      }
    })
  });
}

//signup function for entrepreneurs
exports.entrepreneursignup = (req, res) => {
  console.log(req.body); 

  const {
    efirstName,
    elastName,
    eemail,
    epassword,
    econfirmPassword,
  } = req.body;

  db.query(
    "SELECT email FROM entrepreneurSignup WHERE email = ?",
    [eemail],
    async (error, results) => {
     
      if (!eemail || !epassword ||  !efirstName || !elastName) {
        res.status(400).json({
          message: "All fields are required",
        });
        return;
      }
      if (results.length > 0) {
         res.status(400).json({
           message: "email already exists",
         });
      return;
      }
      if (epassword !== econfirmPassword) {
        res.status(400).json({
          message: "Passwords do not match",
        });
      return;
    }
      
      let hashedPassword = await bcrypt.hash(epassword, 10);

      db.query(
        "INSERT INTO entrepreneurSignup SET ?",
        {
          firstName: efirstName,
          lastName: elastName,
          email: eemail,
          password: hashedPassword,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            res.status(201).json({
              results
            })
          }
        }
      );
    }
  );
};

//get a new access token with a refresh token
exports.refreshtoken = (req, res) => {
  const token = req.cookies.refreshtoken;
  
  if (!token) return res.send({ accesstoken: "" });
  
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: "" });
  }
  
  db.query(
    "SELECT * FROM entrepreneurSignup WHERE email = ?",
    [email],
    async (error, results) => {
      
      if (results.id === payload.userId) {
        if (!results) {
          return res.send({ accesstoken: "" });
        }
        if (results.refreshtoken !== token) {
          return res.send({ accesstoken: "" });
        }
      } else {
        const accesstoken = createAccessToken(results.Id);
        const refreshtoken = createRefreshToken(results.Id);
        results.refreshtoken = refreshtoken;

        sendRefreshToken(res, refreshtoken);
        return res.status(200).json({ accesstoken });
      }
    }
  );
};