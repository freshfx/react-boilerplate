import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import CenteredSection from '../CenteredSection'

const renderComponent = (props = {}) => mount(<CenteredSection {...props} />)

describe('<CenteredSection />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})

