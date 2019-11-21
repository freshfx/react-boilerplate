import React from 'react'
import {render} from '@testing-library/react'

import Form from '../Form'

describe('Form', () => {
  it('should match snapshot', () => {
    const {container} = render(<Form />)
    expect(container.firstChild).toMatchSnapshot()
  })
})

