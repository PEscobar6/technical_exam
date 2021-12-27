'use strict'

const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const authCtl = require('../controllers/Auth');
const verifyToken = require('./validate-toke');
const api = express.Router();


api.get("/", (req, res) => {
    res.status(200).render("index");
});

api.post('/login', authCtl.authenticateUser);

api.get('/entrar', (req, res) => {
    res.status(200).send("Logging");
});

api.get('/interno', verifyToken,(req, res) => {
    const data = jsonwebtoken.decode(req.cookies.token);
    res.render('interno', {
        title: 'Interno',
        descp: 'El usuario se autenticado',
        name: data.name
        
    });
});


module.exports = api;