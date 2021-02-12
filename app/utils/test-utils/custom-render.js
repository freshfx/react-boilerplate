import React from 'react'
import PropTypes from 'prop-types'
import {IntlProvider} from 'react-intl'
import {HelmetProvider} from 'react-helmet-async'
import {Provider} from 'react-redux'
import {render as testingLibraryRender} from '@testing-library/react'

const TestProviders = ({children, store}) => (
  <Provider store={store}>
    <IntlProvider locale="en">
      <HelmetProvider>{children}</HelmetProvider>
    </IntlProvider>
  </Provider>
)

TestProviders.propTypes = {
  children: PropTypes.node.isRequired,
  store: PropTypes.shape({dispatch: PropTypes.func.isRequired}).isRequired
}

/* eslint-disable react/display-name, react/jsx-props-no-spreading */
const render = (ui, options) =>
  testingLibraryRender(ui, {
    wrapper: props => <TestProviders {...props} {...options?.wrapperProps} />,
    ...options
  })
/* eslint-enable */

export default render
