var webpack = require('webpack');
module.exports = {
  entry: ['./src/javascript/App.jsx'],
  output: {
      path: './assets',
      filename: "bundle.js",
  },
  resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['node_modules'], //files in these directory can be required without a relative path
      alias: {
          "react": "React"
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