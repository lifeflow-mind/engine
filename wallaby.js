module.exports = function (w) {

  return {
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
      { pattern: 'src/**/*.spec.ts', ignore: true },
      { pattern: 'src/**/*.spec.tsx', ignore: true },
    ],

    tests: [
      'src/**/*.spec.ts',
      'src/**/*.spec.tsx',
    ],

    preprocessors: {
      '**/*.js': file => require('babel-core').transform(
                                   file.content,
                                   {sourceMap: true, presets: ['latest']})
    },

    testFramework: 'mocha',

    env: {
      type: 'node'
    },

    setup: function () {
      require('babel-polyfill');
    }
  };
};
