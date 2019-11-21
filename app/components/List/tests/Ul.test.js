import React from 'react'
import {render} from '@testing-library/react'

import Ul from '../Ul'

describe('Ul', () => {
  it('should match snapshot', () => {
    const {container} = render(<Ul />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
