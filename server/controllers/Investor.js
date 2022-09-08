const mysql = require("mysql2");
const Investor = require("../models/Investor");
const InvestorAddress = require("../models/InvestorAddress");
const User = require("../models/User");

module.exports = {
    async GetAllInvestors(req, res) {
        try {

            let investors = await Investor.findAll({ include: ["User"] });

            res.status(200).send(investors);

        } catch (err) {
            console.log(err);
            return res.send({
                error: `${err.message}`,
            });

        }

    },

    async GetInvestorById(req, res) {
        try {
            let id = req.params.id;
            let investor = await User.findOne({ where: { UsersId: id }, include: ["Investor"] });

            res.status(200).send(investor);
            console.log(investor);

        } catch (err) {
            console.log(err);
            return res.send({
                error: `${err.message}`,
            });

        }

    },

    async GetInvestorAddress(req, res) {
        try {
            let id = req.params.id;
            let investor = await Investor.findOne({ where: { investorId: id } });

            let invAddress = await InvestorAddress.findOne({ where: { invAddressId: investor.Id } });

            res.status(200).send(invAddress);

        } catch (err) {
            console.log(err);
            return res.send({
                error: `${err.message}`,
            });

        }

    },

    async UpdateInvestorProfile(req, res) {
        try {
            let id = req.params.id;

            const {
                InvestorFirstName,
                InvestorLastName,
                InvestorEmail,
            } = req.body;

            await Investor.update(req.body, { where: { Id: id } });

            res.status(200).send("Details updated successfully");

        } catch (err) {
            console.log(err);
            return res.send({
                error: `${err.message}`,
            });

        }

    }
}