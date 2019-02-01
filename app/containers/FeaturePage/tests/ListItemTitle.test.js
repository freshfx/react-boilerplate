import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import ListItemTitle from '../ListItemTitle'

const renderComponent = (props = {}) => mount(<ListItemTitle {...props} />)

describe('<ListItemTitle />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})
