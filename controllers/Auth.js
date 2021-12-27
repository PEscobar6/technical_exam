"use strict"

const Joi = require('joi');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');
const session = require('express-session');

const authenticateUser = (req, res) => {
    const body = req.body;

    const schema = Joi.object({
        name: Joi.string().required(),
        pwd: Joi.string().required()
    });
    const { error, value } = schema.validate(body);
    const isValid = error == null;

    if (isValid) {
        const pwdSystem = crypto.createHash('sha256').update("12354hdfnb63ybcxbrthy").digest("base64");
        const hash = crypto.createHash('sha256').update(body.pwd).digest('base64');

        if (pwdSystem === hash) {
            const token = jwt.sign({
                name: body.name
            }, config.SECRET_TOKEN);
            
            res.cookie('token', token);

            res.redirect("/interno");
        }else{
            res.render('index', {
                error: 'Contraseña incorrecta'
            });
        }
    } else {
        res.status(422).json({
            status: 422,
            title: "Bad Requesttt",
            message: "La petición es imposible de procesar",
            icon: "warning",
            details: error
        });
    }
}

module.exports = {authenticateUser};