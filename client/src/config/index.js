const port = process.env.PORT || 9100;

// For debug
// console.log('process.env');
// console.log(process.env);
// console.log('port', port);
// console.log('process.env.REACT_APP_SERVER_LOCATION');
// console.log(process.env.REACT_APP_SERVER_LOCATION);

const origins = {
  cloud: 'https://deck-of-cards.eu-gb.cf.appdomain.cloud',
  local: `http://localhost:${port}`,
};

const serverLocation = process.env.REACT_APP_SERVER_LOCATION || 'local';

const origin = origins[serverLocation];

console.log(`Client expects server at origin: ${origin}`);

export default origin;
