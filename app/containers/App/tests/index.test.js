import React from 'react'
import {render} from '@testing-library/react'
import {HelmetProvider} from 'react-helmet-async'

import {App, mapDispatchToProps} from '../index'

jest.mock('react-router-dom', () => ({
  Route({path}) {
    return <div data-testid={`route:${path}`} />
  },
  Switch(props) {
    return <div data-testid="switch" {...props} />
  },
  withRouter(component) {
    return component
  }
}))

jest.mock('components/Header', () => () => <div>Header</div>)
jest.mock('components/Footer', () => () => <div>Footer</div>)

const renderComponent = (props = {}) =>
  render(
    <HelmetProvider>
      <App {...props} />
    </HelmetProvider>
  )

describe('App', () => {
  it('should render the header', () => {
    const {getByText, getByTestId} = renderComponent()
    expect(getByText('Header')).toBeDefined()
    expect(getByText('Footer')).toBeDefined()
    expect(getByTestId('switch')).toBeDefined()
    expect(getByTestId('switch').children).toHaveLength(3)
  })

  describe('mapDispatchToProps', () => {
    it('should return empty set', () => {
      expect(mapDispatchToProps()).toStrictEqual({})
    })
  })
})
