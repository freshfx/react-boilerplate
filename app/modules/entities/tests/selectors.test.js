import {selectEntitiesGenerator} from '../selectors'

describe('modules', () => {
  describe('entities selectors', () => {
    describe('selectEntitiesGenerator', () => {
      const name = 'repositories'
      const selectRepositoryEntities = selectEntitiesGenerator(name)

      it('should return an empty object by default', () => {
        expect(selectRepositoryEntities()).toEqual({})
      })

      it('should return the correct entities state slice', () => {
        const mockedState = {entities: {[name]: {1: {id: 1}}}}
        expect(selectRepositoryEntities(mockedState)).toEqual(mockedState.entities[name])
      })
    })
  })
})
