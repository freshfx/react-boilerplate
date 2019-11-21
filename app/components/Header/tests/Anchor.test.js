import React from 'react'
import {render} from '@testing-library/react'

import Anchor from '../Anchor'

describe('Anchor', () => {
  it('should match snapshot', () => {
    const {container} = render(<Anchor />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
