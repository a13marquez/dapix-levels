<<<<<<< HEAD
import Vue from 'vue'
Vue.config.devtools = false
Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
=======
// Add this to make Electron code run properly. To be perfectly
// honest, I'm not sure why this is necessary.
window.process = window.parent.process
window.require = window.parent.require

// require all test files (files that ends with .spec.js)
var testsContext = require.context('./specs', true, /\.spec$/)
>>>>>>> 739c595db1d22212269627b904401bc9334d5a81
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
<<<<<<< HEAD
const srcContext = require.context('../../src/renderer', true, /^\.\/(?!main(\.js)?$)/)
=======
var srcContext = require.context('../../app', true, /^\.\/(?!(background|main)(\.js)?$)/)
>>>>>>> 739c595db1d22212269627b904401bc9334d5a81
srcContext.keys().forEach(srcContext)
