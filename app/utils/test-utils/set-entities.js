import {actions as entitiesActions} from 'modules/entities'

const setEntities = (store, entities) => {
  store.dispatch(entitiesActions.entitiesLoaded({entities}))
}

export default setEntities
