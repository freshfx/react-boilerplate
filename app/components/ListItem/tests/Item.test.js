import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import Item from '../Item'

const renderComponent = (props = {}) => mount(<Item {...props} />)

describe('<Item />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})

