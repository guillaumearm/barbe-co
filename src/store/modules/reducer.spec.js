const reducer = require('./reducer');

describe('store/rootReducer', () => {
  const unknownAction = { type: 'UNKNOWN' };
  const initialState = reducer(undefined, unknownAction);
  it('returns initial state', () => {
    expect(reducer(undefined, unknownAction)).toMatchSnapshot();
  });
  it('does not update state on unknown action', () => {
    expect(reducer(initialState, unknownAction)).toBe(initialState);
  });
});
