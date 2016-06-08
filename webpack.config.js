module.exports = {
  entry: './App.jsx',
  // output: {
  //   path: './',
  //   filename: 'index.js'
  // },
  output: {
      path: './build',
      filename: "bundle.js",
      publicPath: 'http://localhost:8090/assets'
  },
  // devServer: {
  //   inline: true,
  //   port: 3333,
  // },
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
        loader: 'jsx-loader?insertPragma=React.DOM&harmony'
    }]
  }
}