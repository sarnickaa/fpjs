module.exports = {
  // webpack config options to build the app
  // tells webpack to start with the js code in the index folder
  // compile that code into older versions (through babel) to older js code to make it compatible across browsers
  // output of compilation goes in bundle.js - this will also include all the libraries used
  // bundle.js gets pulled into the browser when webapp is built
  entry: ['./src/index.js'],
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
  },
  watch: true,
  devServer: {
    contentBase: './src',
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
            plugins: [require('babel-plugin-transform-object-rest-spread')],
          },
        },
      },
    ],
  },
};
