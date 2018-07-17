import React from 'react'
import {shallow} from 'enzyme'

import Anchor from '../Anchor'

describe('<A />', () => {
  it('should render an <a> tag', () => {
    const renderedComponent = shallow(<Anchor />)
    expect(renderedComponent.type()).toEqual('a')
  })

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<Anchor />)
    expect(renderedComponent.prop('className')).toBeDefined()
  })

  it('should adopt a valid attribute', () => {
    const id = 'test'
    const renderedComponent = shallow(<Anchor id={id} />)
    expect(renderedComponent.prop('id')).toEqual(id)
  })

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<Anchor attribute="test" />)
    expect(renderedComponent.prop('attribute')).toBeUndefined()
  })
})
