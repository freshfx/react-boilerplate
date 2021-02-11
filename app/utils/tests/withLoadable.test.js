import React from 'react'
import noop from 'lodash/noop'
import {getByTestId, render} from '@testing-library/react'

import withLoadable from '../withLoadable'

const LazyComponent = () => <div data-testid="lazy-component" />
const SuspenseComponent = ({children}) => (
  <div data-testid="suspense-component">{children}</div>
)

React.Suspense = SuspenseComponent
React.lazy = jest.fn(() => LazyComponent)
const TestComponent = withLoadable(noop)
const renderComponent = () => render(<TestComponent />)

describe('withLoadable util', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render a React.Suspense component', () => {
    const {container} = renderComponent()
    expect(getByTestId(container, 'suspense-component')).toBeDefined()
  })

  it('should contain the lazy loaded component', () => {
    const {container} = renderComponent()
    expect(getByTestId(container, 'lazy-component')).toBeDefined()
  })
})
