const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path'); // agregar

const libraryRoot = path.resolve(__dirname, '../rnc-library-ntt'); // dirección de nuestra librería de componentes
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
    // Observar la carpeta de la librería
  watchFolders: [libraryRoot],

  resolver: {
    // Resolver node_modules de ambos proyectos
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(libraryRoot, 'node_modules'),
    ],

    // Evitar duplicación de react y react-native
    extraNodeModules: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    },
  },

  // Configuración de watchman
  watchman: {
    crawl: {
      enabled: true,
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
