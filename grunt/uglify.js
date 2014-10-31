module.exports = {
  options: {
    preserveComments: false
  },

  'output': {
    options: {
      sourceMap: true
    },
    files: {
      './dist/stamplay-ng.min.js': ['./dist/stamplay-ng.js']
    }
  }

};