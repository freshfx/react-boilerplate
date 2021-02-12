/**
 * Testing the NotFoundPage
 */

import React from 'react'
import {render} from '@testing-library/react'
import {IntlProvider} from 'react-intl'

import NotFound from '../index'

jest.mock('components/atoms/H1', () => ({children}) => <h1>{children}</h1>)

const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale="en">
      <NotFound {...props} />
    </IntlProvider>
  )

describe('NotFound', () => {
  it('should match the snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })
})
