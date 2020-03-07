const deckService = require('../services/deck.service');

const getCards = (req, res, next) => {
    const { numCards } = req.query;
    try {
        const cards = deckService.getCards(numCards);
        res.status(200).send(cards);
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
};

module.exports = {
    getCards,
};
