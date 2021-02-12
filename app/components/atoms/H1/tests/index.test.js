import React from 'react'
import {render} from '@testing-library/react'

import H1 from '../index'

describe('H1', () => {
  it('should match snapshot', () => {
    const {container} = render(<H1 />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
