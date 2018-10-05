import React from 'react'
import {shallow} from 'enzyme'

import CenteredSection from '../CenteredSection'

describe('<CenteredSection />', () => {
  it('should have a className attribute', () => {
    const renderedComponent = shallow(<CenteredSection />)
    expect(renderedComponent.prop('className')).toBeDefined()
  })

  it('should adopt a valid attribute', () => {
    const id = 'test'
    const renderedComponent = shallow(<CenteredSection id={id} />)
    expect(renderedComponent.prop('id')).toEqual(id)
  })
})
