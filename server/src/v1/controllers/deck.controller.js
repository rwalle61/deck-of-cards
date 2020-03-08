const deckService = require('../services/deck.service');

const getDeck = (req, res, next) => {
    const cards = deckService.getDeck();
    res.status(200).send(cards);
};

module.exports = {
    getDeck,
};
