import React from 'react'
import {render} from '@testing-library/react'

import Img from '../Img'

describe('Img', () => {
  it('should match snapshot', () => {
    const {container} = render(<Img src="http://example.com/test.jpg" alt="test" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
