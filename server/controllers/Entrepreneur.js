const mysql = require("mysql2");
const Entrepreneur = require("../models/Entrepreneur");
const Investor = require("../models/Investor");
const User = require("../models/User");

module.exports = {
    async GetAllEntrepreneurs(req, res) {
        try {
            
            let entrepreneurs = await Entrepreneur.findAll({ include: ["EntrepreneurAddress"]});

            res.status(200).send(entrepreneurs);

        } catch (err) {
            console.log(err);
            return res.send({
                error: `${err.message}`,
            });

        }

    },

    async GetEntrepreneurById (req, res){
        try {
            let id = req.params.id;
            let entrepreneur = await Investor.findOne({ where: { investorId: id }, include: ["User"] });

            res.status(200).send(entrepreneur);
            
        } catch (err) {
            console.log(err);
            return res.send({
                error: `${err.message}`,
            });

        }
        
    },

    async UpdateEntrepreneurProfile(req, res) {
        try {
            let id = req.params.id;

            const {
                EntrepreneurFirstName,
                EntrepreneurLastName,
                EntrepreneurEmail,
                EntrepreneurPassword
            } = req.body;

            await Entrepreneur.update(req.body, { where: { Id: id } });

            res.status(200).send("Details updated successfully");

        } catch (err) {
            console.log(err);
            return res.send({
                error: `${err.message}`,
            });

        }

    }
}
