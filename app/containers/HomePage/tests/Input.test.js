import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import Input from '../Input'

const renderComponent = (props = {}) => mount(<Input {...props} />)

describe('<Input />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})

