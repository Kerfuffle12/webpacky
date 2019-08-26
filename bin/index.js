#!/usr/bin/env node
const { spawn } = require('child_process')
const inquirer = require('inquirer')

inquirer
  .prompt([
    {
      type: 'checkbox',
      name: 'packages',
      choices: [
        {
          name:'webpack-dev-server',
          value: 'webpack-dev-server',
        },
        {
          name:'case-sensitive-paths-webpack-plugin',
          value: 'case-sensitive-paths-webpack-plugin',
          checked: true,
        },
        {
          name:'html-webpack-plugin',
          value: 'html-webpack-plugin',
        },
        {
          name:'babel',
          value: 'babel-loader @babel/core',
        },
        {
          name:'pug',
          value: 'pug pug-loader',
        },
        {
          name:'css',
          value: 'style-loader css-loader mini-css-extract-plugin',
        },
        {
          name:'stylus',
          value: 'stylus stylus-loader style-loader css-loader mini-css-extract-plugin',
        },
        {
          name: 'webpack-hot-middleware',
          value: 'webpack-hot-middleware',
        },
        {
          name: 'webpack-node-externals',
          value: 'webpack-node-externals',
        },
        {
          name: 'webpack-merge',
          value: 'webpack-merge',
        },
        {
          name: 'webpack-subresource-integrity',
          value: 'webpack-subresource-integrity',
        },
        {
          name:'prettier',
          value: 'prettier pretty-quick',
        },
        {
          name:'husky',
          value: 'husky',
        },
        new inquirer.Separator('----------------------------------'),
      ]
    }
  ])
  .then(answers => {
    const yarnAdd = ['yarn', 'add', '-D', 'webpack', 'webpack-cli']
      .concat(answers.packages)
      .join(' ')

    spawn('/bin/sh', ['-c', yarnAdd], { stdio: [0,1,2] })
    // TODO:
    // create webpack.config.js based on the answers
  })
