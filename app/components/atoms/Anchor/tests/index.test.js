import React from 'react'
import {render} from '@testing-library/react'

import Anchor from '../index'

describe('Anchor', () => {
  it('should match snapshot', () => {
    const {container} = render(<Anchor href="http://mxstbr.com/" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
