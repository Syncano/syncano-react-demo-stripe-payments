import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

// const postcssCfg = path.resolve(__dirname, './postcss.config.js');
// const GLOBALS = {
//   'process.env.NODE_ENV': JSON.stringify('development')
// };

export default {
  entry: [
    'eventsource-polyfill',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/index')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    // new webpack.DefinePlugin(GLOBALS),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: { presets: ['env', 'react'] }
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } }
          // { loader: 'postcss-loader', options: { config: { path: postcssCfg } } }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.scss']
  }
};
