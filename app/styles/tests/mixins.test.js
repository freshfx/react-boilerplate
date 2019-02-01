import React from 'react'
import 'jest-styled-components'
import styled from 'styled-components'
import {mount} from 'enzyme'

import {link} from '../mixins'

const getComponent = mixin => styled.div`${mixin}`

describe('mixins', () => {
  describe('link', () => {
    const Component = getComponent(link)

    it('should render default style', () => {
      const renderedComponent = mount(<Component />)
      expect(renderedComponent).toMatchSnapshot()
    })

    it('should render highlight style', () => {
      const renderedComponent = mount(<Component highlight />)
      expect(renderedComponent).toMatchSnapshot()
    })
  })
})
