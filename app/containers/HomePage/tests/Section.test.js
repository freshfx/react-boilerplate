import React from 'react'
import {render} from '@testing-library/react'

import Section from '../Section'

describe('Section', () => {
  it('should match snapshot', () => {
    const {container} = render(<Section />)
    expect(container.firstChild).toMatchSnapshot()
  })
})

