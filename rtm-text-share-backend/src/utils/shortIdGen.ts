import randomString from 'random-string';

const shortIdGen = (): string => randomString({
  length: 8,
  numeric: true,
  letters: false,
  special: false
});

export default shortIdGen;

