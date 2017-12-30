const { assocPath } = require('ramda');
const helpers = require('./helpers');

module.exports = ({ getState, dispatch }) => (next) => async (action) => {
  if (action.type === 'BITBUCKET_GET') {
    const { endpoint, options } = action.payload.request;
    const response = await helpers.get({ getState, dispatch }, endpoint, options);
    return await next(assocPath(['payload', 'response'], response.data, action))
  }
  return await next(action)
}