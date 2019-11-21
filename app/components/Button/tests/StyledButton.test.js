import React from 'react'
import {render} from '@testing-library/react'

import StyledButton from '../StyledButton'

describe('StyledButton', () => {
  it('should match snapshot', () => {
    const {container} = render(<StyledButton />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
