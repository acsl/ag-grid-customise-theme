const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const svgMinOptions = {
  plugins: [
    { cleanupAttrs: true },
    { removeDoctype: true },
    { removeComments: true },
    { removeMetadata: true },
    { removeTitle: true },
    { removeDesc: true },
    { removeEditorsNSData: true },
    { removeUselessStrokeAndFill: true },
    { cleanupIDs: true },
    { collapseGroups: true },
    { convertShapeToPath: true }
  ]
};

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: {
      'ag-grid-acsl': [ './src/styles.scss', './src/grid.js' ]
    },

    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: '[name].js'
    },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [
            { loader: 'css-loader', options: { minimize: false } } ,
            'sass-loader',
            { loader: 'postcss-loader', options: { syntax: 'postcss-scss', plugins: [ autoprefixer() ] } },
          ]
        })
      },
      {
        test: /\.(svg)$/,
        use: [
          'cache-loader',
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          {   loader: 'image-webpack-loader',
            options: {
              svgo: svgMinOptions
            }
          },
          {
            loader: 'svg-colorize-loader',
            options: {
              color1: "#000000",
              color2: "#FFFFFF"
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};
