import React from 'react'
import {render} from '@testing-library/react'

import H2 from '../index'

describe('H2', () => {
  it('should match snapshot', () => {
    const {container} = render(<H2 />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
