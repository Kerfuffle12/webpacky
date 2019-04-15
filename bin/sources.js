// devServer: {
//     allowedHosts: ['0.0.0.0'],
//     host: 'video.dev.nationalgeographic.com',
//     overlay: true,
//     open: true,
//     port: 3030,
//     hot: true,
//     inline: true,
//     contentBase: path.resolve(__dirname, '..'),
//     stats: 'errors-only',
//     disableHostCheck: true,
//   },
// const miniCSS = require('mini-css-extract-plugin')
// const viewsLoader = {
//   test: /\.pug$/,
//   loader: 'pug-loader',
// }
//
// const jsxLoader = {
//   test: /\.js$/,
//   exclude: /(node_modules|bower_components)/,
//   use: {
//     loader: 'babel-loader',
//     options: {
//       cacheDirectory: true,
//     },
//   },
// }
//
// // stylus loader will generate an error trying to load a base64 font
// // without the quotes as videojs.css include in its src code,
// // a duplication of the loader is necessary to handle css
// const cssLoader = {
//   test: /\.css$/,
//   use: ['style-loader', 'css-loader'],
// }
//
// const styleLoader = {
//   test: /\.styl$/,
//   exclude: /(node_modules|bower_components)/,
//   use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
// }
//
// const extractStylusLoader = {
//   test: /\.styl$/,
//   use: [miniCSS.loader, 'css-loader', 'postcss-loader', 'stylus-loader'],
// }
//
// // stylus loader will generate an error trying to load a base64 font
// // without the quotes as videojs.css include in its src code,
// // a duplication of the loader is necessary to handle css
// const extractCSSLoader = {
//   test: /\.css$/,
//   use: [miniCSS.loader, 'css-loader'],
// }
exports.loadersSource = {
  pug: `{
    test: /\.pug$/,
    loader: 'pug-loader',
  }`,
  stylus: `{
    test: /\.styl$/,
    use: ['style-loader', 'css-loader', 'stylus-loader'],
  }`,
  babel: `{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
  }`
}

exports.pluginsSource = {
  case: `new CaseSensitive()`,
  clean: `new CleanWebpackPlugin()`,
  banner: `new webpack.BannerPlugin('name: [name]')`
}

exports.requiredSource = {
  case: `const CaseSensitive = require('case-sensitive-paths-webpack-plugin')`,
  clean: `const { CleanWebpackPlugin } = require('clean-webpack-plugin')`
}
