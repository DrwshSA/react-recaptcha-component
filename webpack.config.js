const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'react-recaptcha-component',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  devServer: {
    host: 'localhost',
    port: '8080',
    allowedHosts: 'all',
    hot: true,
    open: true,
},
  externals: {
    react: 'react',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'react-recaptcha-component': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};