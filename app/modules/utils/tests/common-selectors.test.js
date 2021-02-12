import {
  createEntitySelectors,
  createSliceFieldSelector,
  createSliceSelector,
  selectId
} from '../common-selectors'

describe('modules utils', () => {
  describe('common selectors', () => {
    describe('selectId', () => {
      it('should select the id from the own props', () => {
        const id = 123
        expect(selectId(null, {id})).toEqual(id)
      })
    })

    describe('createSliceFieldSelector', () => {
      const name = 'repositories'
      const selectSlice = createSliceSelector(name, {})
      const fallback = []
      const selector = createSliceFieldSelector(selectSlice, 'data', fallback)

      it('should create a selector which selects a field of a slice', () => {
        const data = [1, 2, 3]
        const mockedState = {[name]: {data}}
        expect(selector(mockedState)).toEqual(data)
      })

      it('should fallback to a provided fallback value if the field is not defined', () => {
        expect(selector({})).toEqual(fallback)
      })
    })

    describe('createEntitySelectors', () => {
      const id = 'repository-id-1'
      const type = 'repositories'
      const entity = {id, name: 'ffx-boilerplate', type}
      const mockedState = {entities: {[type]: {[id]: entity}}}

      const selectors = createEntitySelectors({type})

      describe('selectEntity', () => {
        it('should select an entity by its type and id', () => {
          expect(selectors.selectEntity(mockedState, {id})).toEqual(entity)
        })

        it('should fallback to an empty object', () => {
          expect(selectors.selectEntity({}, {id})).toEqual({})
        })
      })

      describe('createEntityFieldSelector', () => {
        const selectName = selectors.createEntityFieldSelector(
          repository => repository.name
        )

        it('should select the field of an entity', () => {
          expect(selectName(mockedState, {id})).toEqual(entity.name)
        })
      })
    })
  })
})
