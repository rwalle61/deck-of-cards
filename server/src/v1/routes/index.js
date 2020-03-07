const express = require('express');

const deck = require('./deck.route');

const router = express.Router();

router.use('/deck', deck);

module.exports = router;
