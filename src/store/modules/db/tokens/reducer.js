const { identity, pipe, assoc } = require('ramda');
const { withDefaultState, toReducer } = require('redux-fun')

const initialState = {};

const updateTokens = (action) => pipe(
  assoc('accessToken', action.payload.accessToken),
  assoc('refreshToken', action.payload.refreshToken),
)

module.exports = toReducer(withDefaultState(initialState, (action) => {
  switch (action.type) {
    case 'USER_LOGIN': {
      return updateTokens(action);
    }
    case 'UPDATE_TOKENS': {
      return updateTokens(action);
    }
    default: {
      return identity;
    }
  }
}));