import React from 'react'

import configureStore from 'configure-store'
import history from 'utils/history'
import render from 'utils/test-utils/custom-render'

import App from '../App'

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

jest.mock('components/organisms/Header', () => () => <div>Header</div>)
jest.mock('components/organisms/Footer', () => () => <div>Footer</div>)

const store = configureStore({}, history)
const options = {wrapperProps: {store}}
const renderComponent = () => render(<App />, options)

describe('App', () => {
  it('should render the header', () => {
    const {getByText, getByTestId} = renderComponent()
    expect(getByText('Header')).toBeDefined()
    expect(getByText('Footer')).toBeDefined()
    expect(getByTestId('switch')).toBeDefined()
    expect(getByTestId('switch').children).toHaveLength(3)
  })
})
