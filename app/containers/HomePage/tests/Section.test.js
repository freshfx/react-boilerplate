import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import Section from '../Section'

const renderComponent = (props = {}) => mount(<Section {...props} />)

describe('<Section />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})

