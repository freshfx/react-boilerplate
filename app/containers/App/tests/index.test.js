import React from 'react'
import {shallow} from 'enzyme'
import {Route} from 'react-router-dom'

import Header from 'components/Header'
import Footer from 'components/Footer'
import {App} from '../index'

const one = 1
const zero = 0

describe('<App />', () => {
  it('should render the header', () => {
    const renderedComponent = shallow(<App />)
    expect(renderedComponent.find(Header).length).toBe(one)
  })

  it('should render some routes', () => {
    const renderedComponent = shallow(<App />)
    expect(renderedComponent.find(Route).length).not.toBe(zero)
  })

  it('should render the footer', () => {
    const renderedComponent = shallow(<App />)
    expect(renderedComponent.find(Footer).length).toBe(one)
  })
})
