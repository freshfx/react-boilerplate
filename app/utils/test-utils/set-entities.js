import {actions as entitiesActions} from 'modules/entities'

const setEntities = (store, entities) => {
  store.dispatch(entitiesActions.loaded({entities}))
}

export default setEntities
