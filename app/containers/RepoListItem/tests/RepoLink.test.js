import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import RepoLink from '../RepoLink'

const renderComponent = (props = {}) => mount(<RepoLink {...props} />)

describe('<RepoLink />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})
