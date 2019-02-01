import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import FontIcon from '../index'
import {ICONS} from '../icons'

const name = 'icon_album'

describe('<FontIcon />', () => {
  it('should render all icons', () => {
    ICONS.forEach(icon => {
      const renderedComponent = mount(<FontIcon name={icon} />)
      expect(renderedComponent).toMatchSnapshot()
    })
  })

  it('should render with fixed width', () => {
    const renderedComponent = mount(<FontIcon name={name} fixedWidth />)
    expect(renderedComponent).toMatchSnapshot()
  })

  it('should render flipped', () => {
    const renderedComponent = mount(<FontIcon name={name} flipped />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
