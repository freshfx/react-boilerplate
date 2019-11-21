import {selectId} from '../commonSelectors'

describe('modules utils', () => {
  describe('common selectors', () => {
    describe('selectId', () => {
      it('should select the id from the own props', () => {
        const id = 123
        expect(selectId(null, {id})).toEqual(id)
      })
    })
  })
})
