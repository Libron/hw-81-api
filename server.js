const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const links = require('./app/links');

const app = express();
app.use(cors());
app.use(express.json());

const port = 8000;

mongoose.connect('mongodb://localhost/hw81', { useNewUrlParser: true }).then(() => {
    app.use('/', links);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});