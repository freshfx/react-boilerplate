import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import List from '../List'

const renderComponent = (props = {}) => mount(<List {...props} />)

describe('<List />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})

