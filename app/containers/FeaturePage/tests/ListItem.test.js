import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import ListItem from '../ListItem'

const renderComponent = (props = {}) => mount(<ListItem {...props} />)

describe('<ListItem />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})

