module.exports = {
  // transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
  transformIgnorePatterns: ['node_modules/*.'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
};
