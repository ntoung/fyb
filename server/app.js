import express from 'express';
// import history from 'connect-history-api-fallback';

import webpack from './middleware/webpack';

import { PORT, DIST } from './config/config';

const app = express();

app.use(express.static(DIST));

// app.use(history({
//   verbose: true,
//   disableDotRule: false,
// }));

// const api = require('./api/api');

// This provides help with console logging
// require('./middleware/loggers')(app);

// API Routing
// app.use('/api', api);
webpack(app);

app.listen(PORT);

console.info('Open up http://localhost:%s/ in your browser.', PORT);
