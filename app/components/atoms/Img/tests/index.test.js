import React from 'react'
import {render} from '@testing-library/react'

import Img from '../index'

describe('Img', () => {
  it('should match snapshot', () => {
    const {container} = render(
      <Img src="test.png" alt="test" className="test-class" />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
