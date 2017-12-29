const { cleanLogs } = require('../store/actions');

module.exports = (router) => {
  router.get('/debug', async (ctx) => {
    ctx.body = ctx.store.getState()
  })
  router.get('/cleanlogs', async (ctx) => {
    ctx.store.dispatch(cleanLogs());
    ctx.body = 'OK';
  })
  router.post('/bitbucket_hook', async (ctx) => {
    const body = ctx.request.body;
    const { dispatch } = ctx.store;
    // eslint-disable-next-line no-console
    if (body.push && body.repository.scm === 'git') {
      dispatch({
        type: 'GIT_PUSH',
        payload: body,
      })
    }
    ctx.body = '';
  });
}
