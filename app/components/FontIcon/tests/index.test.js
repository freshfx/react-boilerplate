import React from 'react'
import {render} from '@testing-library/react'

import FontIcon from '../index'
import {ICONS} from '../icons'

const name = 'icon_album'

describe('FontIcon', () => {
  it('should render all icons', () => {
    ICONS.forEach(icon => {
      const {container} = render(<FontIcon name={icon} />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })

  it('should render with fixed width', () => {
    const {container} = render(<FontIcon name={name} fixedWidth />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render flipped', () => {
    const {container} = render(<FontIcon name={name} flipped />)
    expect(container.firstChild).toMatchSnapshot()
  })
})

