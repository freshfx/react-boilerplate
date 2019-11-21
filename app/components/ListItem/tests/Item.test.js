import React from 'react'
import {render} from '@testing-library/react'

import Item from '../Item'

describe('Item', () => {
  it('should match snapshot', () => {
    const {container} = render(<Item />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
