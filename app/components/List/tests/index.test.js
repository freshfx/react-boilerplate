import React from 'react'
import {render} from '@testing-library/react'

import List from '../index'

describe('List', () => {
  it('should match snapshot', () => {
    const Component = () => <div />
    const {container} = render(<List component={Component} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the component if no items are passed', () => {
    const id = 'list-children'
    const Component = () => <div data-testid={id} />
    const {getByTestId} = render(<List component={Component} />)
    expect(getByTestId(id)).toBeDefined()
  })

  it('should pass all item ids to rendered components', () => {
    const items = [1, 2]

    const component = ({id}) => <li data-testid={`item-${id}`}>{id}</li>

    const {container, getByTestId} = render(<List items={items} component={component} />)
    expect(container.querySelector('ul').children).toHaveLength(2)
    expect(getByTestId('item-1')).toBeDefined()
    expect(getByTestId('item-2')).toBeDefined()
  })
})
