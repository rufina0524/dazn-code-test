/**
 * NB: This file is not part of the test. Feel free to take a look,
 * but don't spend any time attempting to improve it.
 */

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config/webpack/webpack.config');

const PORT = 3000;
const IP = '0.0.0.0';
const ROOT = path.resolve(__dirname, '..');
const ASSETS_PATH = path.join(ROOT, 'assets');
const DIST_PATH = path.join(ROOT, 'dist');
const DATA_PATH = path.join(ROOT, 'data');
const MOCK_API_RESPONSE_DELAY = 1000;

const server = express();
const compiler = webpack(config);
const mockData = JSON.parse(
    fs.readFileSync(path.join(DATA_PATH, 'rails.json'))
);

const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src'
});

server.use(middleware);
server.use(webpackHotMiddleware(compiler));
server.use(morgan('dev'));
server.use('/assets', express.static(ASSETS_PATH));
server.get('/api/rails', (_, res) =>
    setTimeout(() => res.json(mockData), MOCK_API_RESPONSE_DELAY)
);
server.get('/*', (_, res) => {
    res.write(
        middleware.fileSystem.readFileSync(path.join(DIST_PATH, 'index.html'))
    );
    res.end();
});

server.listen(PORT, IP, () => {
    const yellow = '\x1b[33m%s\x1b[0m';
    console.log(yellow, `[DAZN Code Test] listening on localhost:${PORT}`);
    console.log(yellow, `[DAZN Code Test] Preparing webpack bundle...`);
});
