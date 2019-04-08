const fs = require('fs')
const prettier = require('prettier')

function webpackConfigCreator(packages) {
  const loadersApplied = packages.map(item => item.loader).filter(Boolean)
  const pluginsApplied = packages.map(item => item.plugin).filter(Boolean)
  const requiredApplied = packages.map(item => item.required).filter(Boolean)

  const configFile = `
    const path = require('path')
    ${requiredApplied.join('\n')}

    module.exports = {
      entry: {
        main: path.resolve(__dirname, 'src/index.js')
      },

      devtool: 'cheap-source-map',

      mode: 'development',

      module: {
        rules: [${loadersApplied}],
      },

      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
      },

      plugins: [new webpack.ProgressPlugin(), ${pluginsApplied}],
    }`


  const prettyConfigFile = prettier.format(configFile, {
    trailingComma: 'all',
    semi: false,
    singleQuote: true,
  })

  fs.writeFileSync('webpack.config.js', prettyConfigFile)
  console.log(prettyConfigFile);
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
}
module.exports = webpackConfigCreator
