// var definePlugin = new webpack.DefinePlugin({
//   __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV==development || 'true'))
// });

// const plugins = [ 
//   new webpack.ProvidePlugin({ 
//       $: ‘jquery’, 
//       jQuery: ‘jquery’, 
//       ‘window.jQuery’: ‘jquery’, 
//       React: ‘react’, 
//       paper: ‘paper’ 
//     })
// ];
//   plugins: [definePlugin]

var webpack = require('webpack');
module.exports = {
  entry: ['./src/javascript/App.jsx'],
  output: {
      path: './build',
      filename: "bundle.js",
      publicPath: 'http://localhost:8090/assets'

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