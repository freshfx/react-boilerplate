import {fromJS} from 'immutable'

import {
  generateImmutableEntityExistsSelector,
  generateImmutableSelector
} from '../generators'

const mockedSelectors = {
  entitiesSelector: state => state.get('entities'),
  idSelector: (state, props) => props.id
}

const id = '123'
const attribute = 'attribute'
const fallback = 'fallback'

const baseState = fromJS({
  entities: {
    [id]: {attribute}
  }
})

const baseProps = {id}

describe('generateImmutableSelector', () => {
  const generatedSelector = generateImmutableSelector({
    attribute,
    fallback,
    ...mockedSelectors
  })

  it('should select the correct attribute from an immutable object', () => {
    expect(generatedSelector(baseState, baseProps)).toEqual(attribute)
  })

  it('should select the passed fallback if the attribute is not defined', () => {
    const mockedState = baseState.deleteIn(['entities', id, 'attribute'])
    expect(generatedSelector(mockedState, baseProps)).toEqual(fallback)
  })

  it('should select the passed fallback if there is no matching entity', () => {
    const mockedProps = {id: '456'}
    expect(generatedSelector(baseState, mockedProps)).toEqual(fallback)
  })
})

describe('generateImmutableEntityExistsSelector', () => {
  const generatedSelector = generateImmutableEntityExistsSelector(mockedSelectors)

  it('should select true if the entity exists', () => {
    expect(generatedSelector(baseState, baseProps)).toBeTruthy()
  })

  it('should select false if the entity does not exist', () => {
    const mockedProps = {id: '456'}
    expect(generatedSelector(baseState, mockedProps)).toBeFalsy()
  })
})
