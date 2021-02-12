import React from 'react'
import {render} from '@testing-library/react'

import PageLoadingIndicator from '../index'

describe('PageLoadingIndicator', () => {
  it('should match the snapshot', () => {
    const {container} = render(<PageLoadingIndicator />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
