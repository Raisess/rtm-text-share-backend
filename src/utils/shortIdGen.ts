import randomString from 'random-string';

function shortIdGen(): string {
	return randomString({
  	length: 8,
  	numeric: true,
  	letters: false,
  	special: false
	});
}

export default shortIdGen;

