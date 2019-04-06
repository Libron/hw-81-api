const express = require('express');
const nanoid = require('nanoid');
const Link = require('../models/Link');

const router = express.Router();

router.get('/', (req, res) => {
    Link.find()
        .then(links => res.send(links))
        .catch(() => res.sendStatus(500));
});

router.get('/:shortUrl', (req, res) => {
    Link.findOne({shortUrl: req.params.shortUrl})
        .then(link => {
            if (link) res.status(301).redirect(link.originalUrl);
            else res.status(404).send('GET SHORT URL');})
        .catch(() => res.sendStatus(500));
});

router.post('/', (req, res) => {
    let linkData = req.body;
    linkData.shortUrl = nanoid(6);

    console.log(linkData);

    const link = new Link(linkData);
    link.save()
        .then(result => {res.send(result)})
        .catch(error => {res.status(400).send(error)});
});

module.exports = router;