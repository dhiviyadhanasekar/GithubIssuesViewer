var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: ['./src/components/app.jsx'],
  output: {
      path: './assets',
      filename: "bundle.js",
      publicPath: 'http://localhost:8090/assets'
  },
  resolve: {
      extensions: ['', '.js', '.jsx'],
      root: path.resolve(__dirname),
      modulesDirectories: ['node_modules'], //files in these directory can be required without a relative path
      alias: {
          "react": "React", //loads react globally
          components: 'src/components'
        }
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
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
          'NODE_ENV': JSON.stringify('development')
        }
      })
    ]
}