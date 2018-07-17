import React from 'react'
import {shallow} from 'enzyme'

import Header from '../index'

const one = 1

describe('<Header />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(<Header />)
    expect(renderedComponent.find('div').length).toEqual(one)
  })
})
