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

exports.loadersSource = {
  pug: `{
    test: /\.pug$/,
    loader: 'pug-loader',
  }`,
  stylus: `{
    test: /\.styl$/,
    use: ['style-loader', 'css-loader', 'stylus-loader'],
  }`,
  stylusMiniCSS: `{
    test: /\.styl$/,
    use: [MiniCSS.loader, 'css-loader', 'stylus-loader'],
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
  }`,
  css: `{
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  }`,
  cssMiniCSS: `{
    test: /\.css$/,
    use: [MiniCSS.loader, 'css-loader'],
  }`,
}

exports.pluginsSource = {
  case: `new CaseSensitive()`,
  clean: `new CleanWebpackPlugin()`,
  banner: `new webpack.BannerPlugin('name: [name]')`
}

exports.requiredSource = {
  case: `const CaseSensitive = require('case-sensitive-paths-webpack-plugin')`,
  clean: `const { CleanWebpackPlugin } = require('clean-webpack-plugin')`,
  minicss: `const MiniCSS = require('mini-css-extract-plugin')`,
}
