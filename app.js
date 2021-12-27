'use strict'

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const api = require('./routes');
const config = require('./config');

const app = express();

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(cookieParser());

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


// motor de plantilla
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));

app.use('/', api);

app.use((req, res, next) => {
    res.status(404).render(`404`);
});

module.exports = app;