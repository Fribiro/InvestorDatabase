const express = require("express");
const authController = require("../controllers/auth");
const { isAuth } = require("../middleware/auth");
const { verify } = require("jsonwebtoken");


const router = express.Router();

router.post("/entrepreneursignup", authController.entrepreneursignup);

router.post("/investorsignup", authController.investorsignup);

router.post("/login", authController.login);
router.post("/invlogin", authController.invlogin);

router.post("/refresh_token", authController.refreshtoken);

router.post("/logout", (_req, res) => {
  res.clearCookie("refreshtoken", { path: "/auth/refresh_token" });
  return res.send({
    message: "Logged out",
  });
});

router.post("/protected", async (req, res) => {
  try {
    const userId = isAuth(req);
    if (userId !== null) {
      res.send({
        data: "This is protected data.",
      });
    }
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});


module.exports = router;
