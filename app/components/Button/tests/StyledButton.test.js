import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import StyledButton from '../StyledButton'

const renderComponent = (props = {}) => mount(<StyledButton {...props} />)

describe('<StyledButton />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})
