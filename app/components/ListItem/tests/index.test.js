import React from 'react'
import {render} from '@testing-library/react'

import ListItem from '../index'

describe('<ListItem />', () => {
  it('should render the content passed to it', () => {
    const text = 'Hello World!'
    const content = <div>{text}</div>
    const {getByText} = render(<ListItem item={content} />)
    expect(getByText(text)).toBeDefined()
  })
})
