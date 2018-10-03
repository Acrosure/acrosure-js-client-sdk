var path = require('path')

module.exports = {
  entry: './dist/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'acrosure-sdk.js',
    library: 'AcrosureClient',
    libraryTarget: 'window'
  }
}
