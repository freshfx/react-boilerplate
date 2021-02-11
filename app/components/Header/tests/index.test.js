import React from 'react'
import {render} from '@testing-library/react'
import {IntlProvider} from 'react-intl'

import Header from '../index'

jest.mock('react-router-dom', () => ({
  Link(props) {
    return <a {...props} href={props.to} />
  }
}))

const renderComponent = () =>
  render(
    <IntlProvider locale="en">
      <Header />
    </IntlProvider>
  )

describe('Header', () => {
  it('should match snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })
})
