const deckService = require('../services/deck.service');

const getCards = (req, res, next) => {
    const { numCards, drawnCards } = req.query;
    try {
        const cards = deckService.getCards(numCards, drawnCards);
        res.status(200).send(cards);
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
};

const shuffle = (req, res, next) => {
    deckService.shuffle();
    res.sendStatus(204);
};

module.exports = {
    getCards,
    shuffle,
};
