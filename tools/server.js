import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import webpackDevMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleWare(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
