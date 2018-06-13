const express = require('express');
const scraperController = require('./scraper');
const cors = require('cors');

const app = express();

app.use(cors());

// first sample route
app.get('/', (req, res) => res.send('hello world'));

app.get('/beaches/*', scraperController.getData);

app.get('/all', scraperController.getAllData);

app.listen(3000);

module.exports = app;
