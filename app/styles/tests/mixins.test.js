import React from 'react'
import styled from '@emotion/styled'
import {render} from '@testing-library/react'

import {link} from '../mixins'

const getComponent = mixin => styled.div`${mixin}`

describe('mixins', () => {
  describe('link', () => {
    const Component = getComponent(link)

    it('should render default style', () => {
      const {container} = render(<Component />)
      expect(container.firstChild).toMatchSnapshot()
    })

    it('should render highlight style', () => {
      const {container} = render(<Component highlight />)
      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
