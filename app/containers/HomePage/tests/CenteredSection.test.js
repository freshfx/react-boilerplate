import React from 'react'
import {render} from '@testing-library/react'

import CenteredSection from '../CenteredSection'

describe('CenteredSection', () => {
  it('should match snapshot', () => {
    const {container} = render(<CenteredSection />)
    expect(container.firstChild).toMatchSnapshot()
  })
})

