module.exports = {
  options: {
    preserveComments: false
  },

  'build': {
    options: {
      sourceMap: false
    },
    files: {
      './dist/stamplay-ng.min.js': ['./dist/stamplay-ng.js']
    }
  },

  'build-with-map': {
    options: {
      sourceMap: true
    },
    files: {
      './dist/stamplay-ng.min.js': ['./dist/stamplay-ng.js']
    }
  }


};