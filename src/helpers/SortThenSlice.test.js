import sortThenSlice from './SortThenSlice';

describe('Array sorting and slicing method', () => {
  it('It sorts an array with more than 5 elements and slices 5 numbers', () => {
    const arr = [0, 2, 17, 61, 5, 84, 10, 1];
    expect(sortThenSlice(arr).length).toEqual(5);
  });
  it('It sorts an array with less than 5 elements and slices 3 numbers', () => {
    const arr = [0, 2, 17];
    expect(sortThenSlice(arr).length).toEqual(3);
  });
});
