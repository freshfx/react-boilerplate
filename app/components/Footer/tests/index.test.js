import React from 'react'
import {render} from '@testing-library/react'
import {IntlProvider} from 'react-intl'

import Footer from '../index'

jest.mock('components/Anchor', () => props => <a {...props} />)
jest.mock('containers/LocaleToggle', () => () => <div id="locale-toggle" />)

const renderComponent = () =>
  render(
    <IntlProvider locale="en">
      <Footer />
    </IntlProvider>
  )

describe('<Footer />', () => {
  it('should match snapshot', () => {
    const {container} = renderComponent()
    expect(container.firstChild).toMatchSnapshot()
  })
})
