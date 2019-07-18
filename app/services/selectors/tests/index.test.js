import {fromJS} from 'immutable'

import {
  selectEntities,
  selectUserEntities
} from '../index'

describe('selectEntities', () => {
  it('should return whole entities', () => {
    const entities = fromJS({bar: 'foo'})
    const store = fromJS({entities})

    expect(selectEntities(store)).toBe(entities)
  })
})

describe('selectUserEntities', () => {
  it('should return users', () => {
    const users = fromJS([
      {id: 1},
      {id: 2}
    ])
    const store = fromJS({
      entities: {users}
    })

    expect(selectUserEntities(store)).toBe(users)
  })
})
