import React from 'react'
import {render} from '@testing-library/react'

import Wrapper from '../Wrapper'

describe('Wrapper', () => {
  it('should match snapshot', () => {
    const {container} = render(<Wrapper />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
