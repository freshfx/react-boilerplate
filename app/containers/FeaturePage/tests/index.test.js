import React from 'react'
import {render} from '@testing-library/react'
import {HelmetProvider} from 'react-helmet-async'
import {IntlProvider} from 'react-intl'

import FeaturePage from '../index'

jest.mock('components/H1', () => props => <h1 {...props}>{props.children}</h1>)

const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale="en">
      <HelmetProvider>
        <FeaturePage {...props} />
      </HelmetProvider>
    </IntlProvider>
  )

describe('<FeaturePage />', () => {
  it('should match snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })
})
