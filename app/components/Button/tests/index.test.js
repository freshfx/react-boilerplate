import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import Button from '../index'

const handleRoute = () => {}

const renderComponent = (props = {}) => render(
  <Button href="http://mxstbr.com" {...props}>
    <h1>Test</h1>
  </Button>
)

describe('Button', () => {
  it('should render an anchor tag if no route is specified', () => {
    const {container} = renderComponent()
    expect(container.querySelector('a')).not.toBeNull()
  })

  it('should render a button tag to change route if the handleRoute prop is specified', () => {
    const {container} = renderComponent({handleRoute})
    expect(container.querySelector('button')).toBeDefined()
  })

  it('should have children', () => {
    const {container} = renderComponent()
    expect(container.querySelector('a').children).toHaveLength(1)
  })

  it('should handle click events', () => {
    const onClickSpy = jest.fn()
    const {container} = renderComponent({onClick: onClickSpy})
    fireEvent.click(container.querySelector('a'))
    expect(onClickSpy).toHaveBeenCalled()
  })

  it('should have a className attribute', () => {
    const {container} = renderComponent()
    expect(container.querySelector('a').hasAttribute('class')).toBe(true)
  })

  it('should not adopt a type attribute when rendering an anchor tag', () => {
    const type = 'text/html'
    const {container} = renderComponent({type})
    expect(container.querySelector(`a[type="${type}"]`)).toBeNull()
  })

  it('should not adopt a type attribute when rendering a button', () => {
    const type = 'submit'
    const {container} = renderComponent({handleRoute, type})
    expect(container.querySelector('button').getAttribute('type')).toBeNull()
  })
})
