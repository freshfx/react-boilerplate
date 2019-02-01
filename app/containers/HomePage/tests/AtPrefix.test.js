import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import AtPrefix from '../AtPrefix'

const renderComponent = (props = {}) => mount(<AtPrefix {...props} />)

describe('<AtPrefix />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})

