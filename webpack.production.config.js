var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/components/app.jsx'],
  output: {
      path: './assets',
      filename: "bundle.min.js",
  },
  resolve: {
      extensions: ['', '.js', '.jsx'],
      root: path.resolve(__dirname),
      modulesDirectories: ['node_modules'], //files in these directory can be required without a relative path
      alias: {
          "react": "React",
          components: 'src/components',
          src: 'src'
        }
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
        loader: 'jsx-loader?insertPragma=React.DOM&harmony',
        query: {
          presets: ['es2015', 'react']
        }
    },
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
            'style', // backup loader when not building .css file
            'css!sass' // loaders to preprocess CSS
        )
    },{
        test: /\.png$/,
        loader: "url-loader",
        query: { mimetype: "image/png" }
    }]
  },
  plugins:[
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({ compress:{ warnings: true }}),
      new ExtractTextPlugin("app.min.css" , {allChunks: true}),
      new HtmlWebpackPlugin({
        template: './index.ejs',
        filename: 'index.html',
        inject: 'body',
        "css": [ "assets/app.min.css" ],
        "js": [ "assets/bundle.min.js"]
      })
    ]
}