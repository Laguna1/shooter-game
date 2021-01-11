const sortThenSlice = (array) => array.sort((a, b) => b.score - a.score).slice(0, 5);

export const sum = (a, b) => a + b;
module.exports = sum;

export default sortThenSlice;