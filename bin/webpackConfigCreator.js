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
}

module.exports = webpackConfigCreator
