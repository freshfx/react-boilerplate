import React from 'react'
import {render} from '@testing-library/react'

import IssueIcon from '../index'

describe('IssueIcon', () => {
  it('should match snapshot', () => {
    const {container} = render(<IssueIcon className="class-name" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
