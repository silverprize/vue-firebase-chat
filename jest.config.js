module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    '.+\\.gif$': require.resolve('jest-transform-stub'),
  },
}
