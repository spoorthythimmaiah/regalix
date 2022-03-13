const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
            compress: true,
            warnings: false
        }
      })
    ]
});
