import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import IssueIcon from '../IssueIcon'

const renderComponent = (props = {}) => mount(<IssueIcon {...props} />)

describe('<IssueIcon />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})
