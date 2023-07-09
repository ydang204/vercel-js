const express = require('express');
const helmet = require('helmet');
const { ErrorResponseObject } = require('./common/http');
const routes = require('./routes');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(helmet());
app.use('/', routes);
// parse request of content type JSON
app.use(bodyParser.json());

//connect mongodb
mongoose.connect
(
    'mongodb+srv://dbuser:danghuynhnhuy123@cluster0.nakww1p.mongodb.net/',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to mongoDB:" + error));

mongoose.connection.once("open", () => console.log("Connected successfully to mongoDB"));

// default catch all handler
app.all('*', (req, res) => res.status(404).json(new ErrorResponseObject('route not defined')));

module.exports = app;
