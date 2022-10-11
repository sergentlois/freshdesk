const express = require("express");
const { appendFile } = require("fs");
const freshRoute = require('./routes/fd');
const bodyParser = require('body-parser');


const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/tickets/', freshRoute)

app.listen(2500, () => {console.log("Server Started: 2500")})