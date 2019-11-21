import React from 'react'
import {render} from '@testing-library/react'

import Input from '../Input'

describe('Input', () => {
  it('should match snapshot', () => {
    const {container} = render(<Input />)
    expect(container.firstChild).toMatchSnapshot()
  })
})

