const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  watch: true,
  watchOptions: {
    poll: true
  },
  mode: 'development',
  devtool: 'source-map',
});
