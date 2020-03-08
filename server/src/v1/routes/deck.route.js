const express = require('express');

const deckController = require('../controllers/deck.controller');

const router = express.Router();

router.get('/', deckController.getDeck);

module.exports = router;
