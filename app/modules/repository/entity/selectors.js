import {createEntitySelectors} from 'modules/utils/common-selectors'

const {
  createEntityFieldSelector: createRepositorySelector
} = createEntitySelectors({type: 'repositories'})

const makeSelectOwnerUsername = () =>
  createRepositorySelector(repository => repository?.owner?.login)

const makeSelectUrl = () =>
  createRepositorySelector(repository => repository.html_url)

const makeSelectName = () =>
  createRepositorySelector(repository => repository.name)

const makeSelectOpenIssuesCount = () =>
  createRepositorySelector(repository => repository.open_issues_count)

const makeSelectFullName = () =>
  createRepositorySelector(repository => repository.full_name)

export {
  makeSelectFullName,
  makeSelectName,
  makeSelectOpenIssuesCount,
  makeSelectOwnerUsername,
  makeSelectUrl
}
