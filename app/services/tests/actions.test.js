import {
  LOAD_RESOURCES_SUCCESS,
  LOAD_RESOURCES_ERROR
} from '../constants'

import {
  resourcesLoaded,
  resourcesLoadingError
} from '../actions'

describe('Services Actions', () => {
  describe('resourcesLoaded', () => {
    it('should return the correct type and the passed query', () => {
      const entities = {key: 'value'}
      const expectedResult = {
        entities,
        type: LOAD_RESOURCES_SUCCESS
      }

      expect(resourcesLoaded(entities)).toEqual(expectedResult)
    })
  })

  describe('resourcesLoadingError', () => {
    it('should return the correct type and the passed value', () => {
      const error = 'error'
      const expectedResult = {
        error,
        type: LOAD_RESOURCES_ERROR
      }

      expect(resourcesLoadingError(error)).toEqual(expectedResult)
    })
  })
})
