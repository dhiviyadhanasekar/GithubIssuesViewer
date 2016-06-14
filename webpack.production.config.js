var webpack = require('webpack');
module.exports = {
  entry: './App.jsx',
  output: {
      path: './build',
      filename: "bundle.js",
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', "react"]
      }
    },   
    {
        //tell webpack to use jsx-loader for all *.jsx files
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'jsx-loader?insertPragma=React.DOM&harmony'
    }]
  },
  plugins:[
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress:{
          warnings: true
        }
      })
    ]
}