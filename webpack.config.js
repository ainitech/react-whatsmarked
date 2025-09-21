const path = require('path');

module.exports = {
  entry: './src/react-whatsmarked.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'react-whatsmarked.js',
    library: 'ReactWhatsmarked',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Transpila para ES5 (React 16 exige isso para rodar em browsers antigos)
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['>0.25%', 'not dead', 'ie 11']
                  },
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ],
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    }
  },
  resolve: {
    extensions: ['.js']
  },
  mode: 'production'
};
