import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import Button from '../index'

const handleRoute = () => {}

const renderComponent = (props = {}) =>
  render(
    <Button href="#test" {...props}>
      <h1>Test</h1>
    </Button>
  )

describe('Button', () => {
  it('should render an anchor tag if no route is specified', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render a button tag to change route if the handleRoute prop is specified', () => {
    const {container} = renderComponent({handleRoute})
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should have children', () => {
    const {container, getByText} = renderComponent()
    const child = getByText('Test')
    expect(container.querySelector('a').firstChild).toEqual(child)
  })

  it('should handle click events', () => {
    const onClickSpy = jest.fn()
    const {getByText} = renderComponent({onClick: onClickSpy})
    fireEvent.click(getByText('Test'))
    expect(onClickSpy).toHaveBeenCalled()
  })

  it('should have a className attribute', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toHaveAttribute('class')
  })
})
