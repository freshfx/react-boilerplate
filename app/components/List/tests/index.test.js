import React from 'react'
import {shallow} from 'enzyme'

import ListItem from 'components/ListItem'
import List from '../index'

const two = 2

describe('<List />', () => {
  it('should render the component if no items are passed', () => {
    const renderedComponent = shallow(<List component={ListItem} />)
    expect(renderedComponent.find(ListItem)).toBeDefined()
  })

  it('should pass all item ids to rendered components', () => {
    const items = [1, 2]

    const component = ({item}) => <ListItem>{item.name}</ListItem> // eslint-disable-line react/prop-types

    const renderedComponent = shallow(<List items={items} component={component} />)
    expect(renderedComponent.find(component)).toHaveLength(two)
    expect(renderedComponent
      .find(component)
      .at(0)
      .prop('id')).toBe(items[0])
    expect(renderedComponent
      .find(component)
      .at(1)
      .prop('id')).toBe(items[1])
  })
})
