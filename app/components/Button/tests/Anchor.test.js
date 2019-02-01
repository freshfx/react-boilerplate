import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import Anchor from '../Anchor'

const renderComponent = (props = {}) => mount(<Anchor {...props} />)

describe('<Anchor />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})

