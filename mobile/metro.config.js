const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure that all node_modules are resolved
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;