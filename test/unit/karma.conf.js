<<<<<<< HEAD
'use strict'

const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const baseConfig = require('../../.electron-vue/webpack.renderer.config')
const projectRoot = path.resolve(__dirname, '../../src/renderer')

// Set BABEL_ENV to use proper preset config
process.env.BABEL_ENV = 'test'

let webpackConfig = merge(baseConfig, {
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"testing"'
    })
  ]
})

// don't treat dependencies as externals
delete webpackConfig.entry
delete webpackConfig.externals
delete webpackConfig.output.libraryTarget

// apply vue option to apply isparta-loader on js
webpackConfig.module.rules
  .find(rule => rule.use.loader === 'vue-loader').use.options.loaders.js = 'babel-loader'

module.exports = config => {
  config.set({
    browsers: ['visibleElectron'],
    client: {
      useIframe: false
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    customLaunchers: {
      'visibleElectron': {
        base: 'Electron',
        flags: ['--show']
      }
    },
    frameworks: ['mocha', 'chai'],
=======
// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var path = require('path')
var merge = require('webpack-merge')
var baseConfig = require('../../build/webpack.base.conf')
var projectRoot = path.resolve(__dirname, '../../')

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  devtool: '#inline-source-map',
  vue: {
    loaders: {
      js: 'isparta'
    }
  }
})

// make sure isparta loader is applied before eslint
webpackConfig.module.preLoaders.unshift({
  test: /\.js$/,
  loader: 'isparta',
  include: projectRoot,
  exclude: /test\/unit|node_modules/
})

// only apply babel for test files when using isparta
webpackConfig.module.loaders.some(function (loader, i) {
  if (loader.loader === 'babel') {
    loader.include = /test\/unit/
    return true
  }
})

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['Electron'],
    frameworks: ['jasmine'],
    reporters: ['spec', 'coverage'],
>>>>>>> 739c595db1d22212269627b904401bc9334d5a81
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
<<<<<<< HEAD
    reporters: ['spec', 'coverage'],
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
=======
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
>>>>>>> 739c595db1d22212269627b904401bc9334d5a81
    }
  })
}
