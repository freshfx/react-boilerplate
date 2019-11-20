import React from 'react'
import {shallow} from 'enzyme'

import ListItem from 'components/ListItem'
import List from '../index'

const zero = 0
const two = 2

describe('<List />', () => {
  it('should render the component if no items are passed', () => {
    const renderedComponent = shallow(<List component={ListItem} />)
    expect(renderedComponent.find(ListItem)).toBeDefined()
  })

  it('should pass all items props to rendered component', () => {
    const items = [
      {
        id: 1,
        name: 'Hello'
      },
      {
        id: 2,
        name: 'World'
      }
    ]

    const component = ({item}) => <ListItem>{item.name}</ListItem> // eslint-disable-line react/prop-types

    const renderedComponent = shallow(<List items={items} component={component} />)
    expect(renderedComponent.find(component)).toHaveLength(two)
    expect(renderedComponent
      .find(component)
      .at(zero)
      .prop('item')).toBe(items[zero])
    expect(renderedComponent
      .find(component)
      .at(zero)
      .prop('item')).toBe(items[zero])
  })
})
