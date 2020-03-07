const express = require('express');

const persons = require('./persons.route');

const router = express.Router();

router.use('/persons', persons);

module.exports = router;
