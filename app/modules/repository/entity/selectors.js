import {createSelector} from '@reduxjs/toolkit'
import get from 'lodash/get'

import {selectRepositoryEntities} from 'modules/entities/selectors'
import {selectId} from 'modules/utils/commonSelectors'

const makeSelectOwnerUsername = () => createSelector(
  selectRepositoryEntities,
  selectId,
  (repositories, id) => get(repositories, [id, 'owner', 'login'])
)

const makeSelectUrl = () => createSelector(
  selectRepositoryEntities,
  selectId,
  (repositories, id) => get(repositories, [id, 'html_url'])
)

const makeSelectName = () => createSelector(
  selectRepositoryEntities,
  selectId,
  (repositories, id) => get(repositories, [id, 'name'])
)

const makeSelectOpenIssuesCount = () => createSelector(
  selectRepositoryEntities,
  selectId,
  (repositories, id) => get(repositories, [id, 'open_issues_count'])
)

const makeSelectFullName = () => createSelector(
  selectRepositoryEntities,
  selectId,
  (repositories, id) => get(repositories, [id, 'full_name'])
)

export {
  makeSelectFullName,
  makeSelectName,
  makeSelectOpenIssuesCount,
  makeSelectOwnerUsername,
  makeSelectUrl
}
