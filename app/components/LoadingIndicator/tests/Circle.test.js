import React from 'react'
import {render} from '@testing-library/react'

import Circle from '../Circle'

describe('Circle', () => {
  it('should match default snapshot', () => {
    const {container} = render(<Circle />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should match snapshot with rotate', () => {
    const {container} = render(<Circle rotate={10} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should match snapshot with rotate & delay', () => {
    const {container} = render(<Circle rotate={10} delay={100} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
