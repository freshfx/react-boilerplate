import React from 'react'
import {render} from '@testing-library/react'
import {HelmetProvider} from 'react-helmet-async'
import {Provider} from 'react-redux'

import configureStore from 'configure-store'
import history from 'utils/history'

import {App} from '../index'

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

const store = configureStore({}, history)
const renderComponent = (props = {}) =>
  render(
    <Provider store={store}>
      <HelmetProvider>
        <App {...props} />
      </HelmetProvider>
    </Provider>
  )

describe('App', () => {
  it('should render the header', () => {
    const {getByText, getByTestId} = renderComponent()
    expect(getByText('Header')).toBeDefined()
    expect(getByText('Footer')).toBeDefined()
    expect(getByTestId('switch')).toBeDefined()
    expect(getByTestId('switch').children).toHaveLength(3)
  })
})
