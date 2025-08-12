const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/index.jsx',
output: {
  filename: isProd ? '[name].[contenthash].js' : '[name].js', // ← revert to this
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
  clean: true,
},
  devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
 module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: 'defaults' }],
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
      },
    },
    { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    { test: /\.(png|jpg|jpeg|gif|svg)$/i, type: 'asset' },
  ],
},
  resolve: { extensions: ['.js', '.jsx'] },
  devServer: {
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
    hot: true,
    port: 5173,
    open: false
  },
  optimization: { splitChunks: { chunks: 'all' } }
};
