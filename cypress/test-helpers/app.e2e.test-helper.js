const regExpForValidCard = /[CSHD][AKQJ0-9]{1,2}/;

const checkElementsAreValidCards = (elements) => {
    elements.forEach((card) => {
        expect(card).to.match(regExpForValidCard, 'not all elements are valid cards');
    });
};

const checkElementsAreUnique = (elements) => {
    const uniqueElements = [...(new Set(elements))];
    expect(elements.length).to.equal(uniqueElements.length, 'not all elements are unique');
};

const childrenShouldContainOnlyUniqueCards = (children) => {
    const cards = children.toArray().map((el) => el.id);
    checkElementsAreValidCards(cards);
    checkElementsAreUnique(cards);
};

const sortedDeck = [
    'CA', 'CK', 'CQ', 'CJ', 'C10', 'C9', 'C8', 'C7', 'C6', 'C5', 'C4', 'C3', 'C2',
    'SA', 'SK', 'SQ', 'SJ', 'S10', 'S9', 'S8', 'S7', 'S6', 'S5', 'S4', 'S3', 'S2',
    'HA', 'HK', 'HQ', 'HJ', 'H10', 'H9', 'H8', 'H7', 'H6', 'H5', 'H4', 'H3', 'H2',
    'DA', 'DK', 'DQ', 'DJ', 'D10', 'D9', 'D8', 'D7', 'D6', 'D5', 'D4', 'D3', 'D2',
];

const childrenShouldBeSorted = (children) => {
    const cards = children.toArray().map((el) => el.id);
    const cardIndexes = cards.map((card) => sortedDeck.indexOf(card));
    const sortedCardsIndexes = [...cardIndexes].sort((a, b) => a - b);
    expect(cardIndexes).to.deep.equal(sortedCardsIndexes, 'cards are not sorted but should be sorted');
};

const childrenShouldNotBeSorted = ($els) => {
    const cards = $els.toArray().map((el) => el.id);
    const cardIndexes = cards.map((card) => sortedDeck.indexOf(card));
    const sortedCardsIndexes = [...cardIndexes].sort((a, b) => a - b);
    expect(cardIndexes).to.not.deep.equal(sortedCardsIndexes, 'cards are sorted but should not be sorted');
};

export {
    childrenShouldContainOnlyUniqueCards,
    childrenShouldBeSorted,
    childrenShouldNotBeSorted,
};
