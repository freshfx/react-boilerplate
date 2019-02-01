import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import Ul from '../Ul'

const renderComponent = (props = {}) => mount(<Ul {...props} />)

describe('<Ul />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})
