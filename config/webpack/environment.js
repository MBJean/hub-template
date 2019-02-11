const { environment } = require('@rails/webpacker')
const vue =  require('./loaders/vue')

environment.loaders.get('sass').use.find(item => item.loader === 'sass-loader').options.includePaths = ['node_modules']

environment.loaders.append('vue', vue)
module.exports = environment
