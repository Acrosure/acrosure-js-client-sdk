var path = require('path')

module.exports = {
  entry: './dist/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.cdn.js',
    library: 'AcrosureClient',
    libraryTarget: 'window'
  }
}
