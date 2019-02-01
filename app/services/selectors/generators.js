import {createSelector} from 'reselect'

export const generateImmutableSelector = ({
  attribute,
  entitiesSelector,
  fallback,
  idSelector
}) => createSelector(
  idSelector,
  entitiesSelector,
  (id, entities) => entities.getIn([id, attribute], fallback)
)

export const generateImmutableEntityExistsSelector = ({
  entitiesSelector,
  idSelector
}) => createSelector(
  idSelector,
  entitiesSelector,
  (id, entities) => entities.has(id)
)

