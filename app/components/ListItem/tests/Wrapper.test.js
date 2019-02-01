import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import Wrapper from '../Wrapper'

const renderComponent = (props = {}) => mount(<Wrapper {...props} />)

describe('<Wrapper />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})

