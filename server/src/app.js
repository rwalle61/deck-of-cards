const express = require('express');
require('express-async-errors');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const Logger = require('./utils/Logger');
const errorHandler = require('./middleware/errorHandler');
const { port } = require('./config');
const v1Routes = require('./v1/routes');

const log = new Logger(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use('/health', (req, res) => res.sendStatus(204));
app.use('/api/v1/', v1Routes);
app.use(
    '/',
    express.static(path.join(__dirname, '..', '..', 'client', 'build')),
);
app.use('/serverImages', express.static(path.join(__dirname, '..', 'public')));

app.use(errorHandler.handleErrors);

app.listen(port, () => {
    log.info(`App running on port ${port}`);
});

module.exports = app;
