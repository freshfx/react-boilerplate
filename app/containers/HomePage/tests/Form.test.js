import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import Form from '../Form'

const renderComponent = (props = {}) => mount(<Form {...props} />)

describe('<Form />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})

