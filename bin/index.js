#!/usr/bin/env node
const { spawn } = require('child_process')
const inquirer = require('inquirer')
const webpackConfigCreator = require('./webpackConfigCreator')
const { loadersSource, requiredSource, pluginsSource } = require('./sources')

function cleanLoaders(loaders) {
  const miniCSS = loaders.some(item => item.packages === 'mini-css-extract-plugin')

  if (miniCSS) {
    loaders.map(item => {
      if (/stylus-loader/.test(item.packages)) {
        item.loader = loadersSource.stylusMiniCSS
      }

      if (/css-loader/.test(item.packages)) {
        item.loader = loadersSource.stylusMiniCSS
      }
    })
  }
}

inquirer
  .prompt([
    {
      type: 'checkbox',
      name: 'packages',
      choices: [
        {
          name:'webpack-dev-server',
          value: { packages: 'webpack-dev-server', },
        },
        {
          name:'babel',
          value: {
            packages: 'babel-loader @babel/core',
            loader: loadersSource.babel,
          },
        },
        {
          name:'pug',
          value: {
            packages: 'pug pug-loader',
            loader: loadersSource.pug,
          },
        },
        {
          name:'css',
          value: {
            packages: 'style-loader css-loader',
            loader: loadersSource.css,
          },
        },
        {
          name:'stylus',
          value: {
            packages: 'stylus stylus-loader style-loader css-loader',
            loader: loadersSource.stylus,
          },
        },
        {
          name: 'mini-css-extract-plugin',
          value: {
            packages: 'mini-css-extract-plugin',
            required: requiredSource.minicss,
          },
        },
        {
          name:'clean-webpack-plugin',
          value: {
            packages: 'clean-webpack-plugin',
            plugin: pluginsSource.clean,
            required: requiredSource.clean,
          },
        },
        {
          name:'case-sensitive-paths-webpack-plugin',
          value: {
            packages: 'case-sensitive-paths-webpack-plugin',
            plugin: pluginsSource.case,
            required: requiredSource.case,
          },
          checked: true,
        },
        {
          name:'html-webpack-plugin',
          value: { packages: 'html-webpack-plugin', },
        },
        {
          name:'BannerPlugin',
          value: {
            packages: '',
            plugin: pluginsSource.banner,
          },
        },
        {
          name: 'webpack-hot-middleware',
          value: { packages: 'webpack-hot-middleware', },
        },
        {
          name: 'webpack-node-externals',
          value: { packages: 'webpack-node-externals', },
        },
        {
          name: 'webpack-merge',
          value: { packages: 'webpack-merge', },
        },
        {
          name: 'webpack-subresource-integrity',
          value: { packages: 'webpack-subresource-integrity', },
        },
        {
          name:'prettier',
          value: { packages: 'prettier pretty-quick', },
        },
        {
          name:'husky',
          value: { packages: 'husky', },
        },
        new inquirer.Separator('----------------------------------'),
      ]
    }
  ])
  .then(answers => {
    // Mutate packages initially to check and replace style-loader to miniCSSExtractPlugin
    cleanLoaders(answers.packages)

    console.log(answers.packages);
    const yarnAdd = ['yarn', 'add', '-D', 'webpack', 'webpack-cli']
      .concat(answers.packages.map(item => item.packages))
      .join(' ')

    webpackConfigCreator(answers.packages)
    // spawn('/bin/sh', ['-c', yarnAdd], { stdio: [0,1,2] })
  })
