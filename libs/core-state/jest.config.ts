/* eslint-disable */
export default {
  displayName: 'core-state',
  preset: '../../jest.preset.js',
  /* Need maxWorkers to make serializing bigint work for some reason*/
  maxWorkers: 1,
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/core-state',
};
