const express = require("express");
const { appendFile } = require("fs");
const freshRoute = require('./routes/fd');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config({path: './.env'});


app.use('/freshdesk/', freshRoute)

app.listen(2500, () => {console.log("Server Started: 2500")})