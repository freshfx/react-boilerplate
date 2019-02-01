
import 'jest-styled-components'
import React from 'react'
import {mount} from 'enzyme'

import Select from '../Select'

describe('<Select />', () => {
  it('should match snapshot', () => {
    const renderedComponent = mount(<Select />)
    expect(renderedComponent).toMatchSnapshot()
  })
})
