const mysql = require("mysql2");
const { jwt, verify } = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
} = require('../middleware/Token');
const Investor = require("../models/Investor");
const Entrepreneur = require("../models/Entrepreneur");
const User = require("../models/User");
const Role = require("../models/Role");

exports.Login = async (req, res) => {
    try {
        const { UserEmail, UserPassword } = req.body;

        if (!UserEmail || !UserPassword) {
            res.status(400).json({
                message: "Please provide an email and password",
            });
            return;
        }

        try {
            const user = await User.findOne({ where: { UserEmail: UserEmail } });
            if (!user) throw new Error("User does not exist.");

            const accesstoken = createAccessToken(user.UsersId);
            const refreshtoken = createRefreshToken(user.UsersId);

            await User.update(
                { userToken: refreshtoken },
                { where: { UserEmail: UserEmail } }
            );
            console.log(user);

            sendRefreshToken(res, refreshtoken);
            sendAccessToken(req, res, accesstoken, user.UsersId ,user.UserRole);


        } catch (err) {
            res.send({
                error: `${err.message}`,
            });
        }

    } catch (err) {
        res.send({
            error: `${err.message}`,
        });
    }
};

exports.Refreshtoken = async (req, res) => {
    const token = req.cookies.refreshtoken;
    console.log(token);


    if (!token) return res.send("No refreshtoken");

    let payload = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        return res.send("Invalid token");
    }
    console.log(payload);


    const user = await User.findOne({ where: { UsersId: payload.userId } });

    if (!user) {
        return res.send("User not found!");
    }
    if (user.UserToken !== token) {
        return res.send("Invalid token...");
    }
    const accesstoken = createAccessToken(User.UsersId);
    const refreshtoken = createRefreshToken(User.UsersId);
    await User.update(
        { UserToken: refreshtoken },
        { where: { UserEmail: user.UserEmail } }
    );

    sendRefreshToken(req, res, refreshtoken);
    const { UserEmail, UserRole } = user;
    return res.send({ accesstoken, refreshtoken, UserEmail,UserRole });

};

exports.investorSignup = async (req, res) => {
    try {

        const {
            InvestorFirstName,
            InvestorLastName,
            UserEmail,
            UserPassword
        } = req.body;

        //validation 
        if (!InvestorFirstName) return res.status(400).send("investor first name is required");
        if (!InvestorLastName) return res.status(400).send("investor last name is required");
        if (!UserEmail) return res.status(400).send("email is required");
        if (!UserPassword) return res.status(400).send("password is required");

        if (!UserPassword || UserPassword.length < 6) {
            return res
                .status(400)
                .send("password is required and should be min 6 characters long");
        }

        let role = await Role.findOne({ where: { RoleId: 2 } })

        const user = await User.create({
            UserEmail,
            UserPassword,
            UserRole: role.RoleId,
        });

        const investorSignup = await Investor.create({
            InvestorFirstName,
            InvestorLastName,
        })



        res.status(200).send({ user, investorSignup });

    } catch (error) {
        console.log("this is the investor create error=>", error);
        return res.status(400).send("Error. Try again.");
    }

};

exports.entrepreneurSignup = async (req, res) => {
    try {

        const {
            EntrepreneurFirstName,
            EntrepreneurLastName,
            UserEmail,
            UserPassword
        } = req.body;

        //validation 
        if (!EntrepreneurFirstName) return res.status(400).send("entrepreneur first name is required");
        if (!EntrepreneurLastName) return res.status(400).send("entrepreneur last name is required");
        if (!UserEmail) return res.status(400).send("email is required");
        if (!UserPassword) return res.status(400).send("password is required");


        if (!UserPassword || UserPassword.length < 6) {
            return res
                .status(400)
                .send("password is required and should be min 6 characters long");
        }

        let role = await Role.findOne({ where: { RoleId: 3 } })

        const user = await User.create({
            UserEmail,
            UserPassword,
            UserRole: role.RoleId,
        });

        const entrepreneurSignup = await Entrepreneur.create({
            EntrepreneurFirstName,
            EntrepreneurLastName,
        });



        res.status(200).send({ user, entrepreneurSignup });

    } catch (error) {
        console.log("this is the entrepreneur create error=>", error);
        return res.status(400).send("Error. Try again.");
    }

};


exports.logout = async (req, res) => {
    res.clearCookie('refreshtoken', { path: '/refresh_token' });
    return res.send({
        message: 'Logged out'
    })
}