import React from 'react'
import {render} from '@testing-library/react'

import AtPrefix from '../AtPrefix'

describe('AtPrefix', () => {
  it('should match snapshot', () => {
    const {container} = render(<AtPrefix />)
    expect(container.firstChild).toMatchSnapshot()
  })
})

