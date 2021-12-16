const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sequelize} = require('./conn');
const services = require('./services');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('services', services);
app.use('/', routes);

module.exports = app;
