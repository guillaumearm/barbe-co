const { identity } = require('ramda');
const { toReducer } = require('redux-fun')

const initialState = {};

module.exports = toReducer((action) => {
  if (action.type === 'GIT_PUSH') {
    return identity;
  }
  return identity;
}, initialState);
