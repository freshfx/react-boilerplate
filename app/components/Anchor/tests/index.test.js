/**
 * Testing our link component
 */

import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import Anchor from '../index'

const href = 'http://mxstbr.com/'
const renderComponent = (props = {}) =>
  mount(<Anchor href={href} {...props}>Test</Anchor>)

describe('<Anchor />', () => {
  it('should match snapshot', () => {
    const renderedComponent = renderComponent()
    expect(renderedComponent).toMatchSnapshot()
  })
})
