// karma.conf.cjs
const path = require('node:path');

/** @type {import('karma').Config} */
module.exports = (config) => {
  config.set({
    // Pon Vite primero para que monte su server antes de incluir los tests
    frameworks: ['vite', 'jasmine'],

    // Fija la base sobre la raíz del proyecto
    basePath: path.resolve(__dirname),

    // Declara los archivos explícitamente (sin llaves) y márcalos como "served"
    files: [
      { pattern: 'src/setupTests.js',  type: 'module', watched: false, included: true,  served: true },
      { pattern: 'src/**/*.test.jsx',  type: 'module', watched: false, included: true,  served: true },
      { pattern: 'src/**/*.test.js',   type: 'module', watched: false, included: true,  served: true },
      { pattern: 'src/**/*.test.ts',   type: 'module', watched: false, included: true,  served: true },
      { pattern: 'src/**/*.test.tsx',  type: 'module', watched: false, included: true,  served: true },
    ],

    // Plugins reales (evita el error de __karma__.start)
    plugins: [
      require('karma-vite'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
    ],

    // Config propia de Vite (opcional, pero ayuda a rutas)
    vite: {
      root: path.resolve(__dirname),
      publicDir: false,
    },

    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },

    browsers: ['ChromeHeadless'],
    browserNoActivityTimeout: 60000,
    captureTimeout: 120000,
    singleRun: false,
    // Si el 9876 está ocupado, Karma elige otro. Puedes fijar uno con --port.
  });
};
