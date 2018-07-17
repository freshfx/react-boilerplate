import React from 'react'
import {shallow} from 'enzyme'

import IssueIcon from '../index'

const one = 1

describe('<IssueIcon />', () => {
  it('should render a SVG', () => {
    const renderedComponent = shallow(<IssueIcon />)
    expect(renderedComponent.find('svg').length).toBe(one)
  })
})
