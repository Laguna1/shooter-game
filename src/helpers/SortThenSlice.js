const sortThenSlice = (array) => array.sort((a, b) => b.score - a.score).slice(0, 5);

export default sortThenSlice;