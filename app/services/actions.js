import {
  LOAD_RESOURCES_SUCCESS,
  LOAD_RESOURCES_ERROR
} from './constants'

export function resourcesLoaded(entities) {
  return {
    entities,
    type: LOAD_RESOURCES_SUCCESS
  }
}

export function resourcesLoadingError(error) {
  return {
    error,
    type: LOAD_RESOURCES_ERROR
  }
}
