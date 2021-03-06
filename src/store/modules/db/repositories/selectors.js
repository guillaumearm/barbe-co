const _ = require('lodash/fp');
const { map, pipe, prop, propOr, path, pathOr, values } = require('ramda');
const { createSelector } = require('reselect');

const getRepositories = pathOr({}, ['db', 'repositories']);

const getRepository = createSelector(
  (state, { repositoryFullName } = {}) => repositoryFullName,
  getRepositories,
  _.get
)

const getRepositoriesNames = createSelector(
  getRepositories,
  pipe(
    values,
    map(prop('full_name'))
  )
)

const getBranches = createSelector(
  getRepository,
  propOr([], 'branches')
)

const getBranchesNames = createSelector(
  getBranches,
  pipe(
    values,
    map(prop('name')),
  ),
)

const getBranch = createSelector(
  getRepository,
  (state, { branchName } = {}) => branchName,
  (repository, branchName) => path(['branches', branchName], repository)
)

const getBranchCommits = createSelector(
  getBranch,
  propOr([], 'commits'),
)

const getBranchLastCommit = createSelector(
  getBranchCommits,
  prop(0),
)

const getAllBranchesCommits = createSelector(
  getRepositories,
  _.flatMap(
    _.pipe(
      _.get('branches'),
      _.flatMap(_.pipe(
        _.get('commits'),
      )),
    )
  )
)

module.exports = {
  getRepositories,
  getRepository,
  getBranchCommits,
  getBranchLastCommit,
  getBranch,
  getBranches,
  getBranchesNames,
  getRepositoriesNames,
  getAllBranchesCommits,
}
