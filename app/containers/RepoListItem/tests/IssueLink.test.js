import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import IssueLink from '../IssueLink'

const renderComponent = (props = {}) => mount(<IssueLink {...props} />)

describe('<IssueLink />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})
