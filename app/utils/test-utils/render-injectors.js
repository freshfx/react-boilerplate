import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {render as testingLibraryRender} from '@testing-library/react'

import AppInjector from 'components/Injector'

const TestProviders = ({children, store}) => (
  <Provider store={store}>
    <AppInjector />
    {children}
  </Provider>
)

TestProviders.propTypes = {
  children: PropTypes.node.isRequired,
  store: PropTypes.shape({dispatch: PropTypes.func.isRequired}).isRequired
}

/* eslint-disable react/display-name, react/jsx-props-no-spreading */
const renderInjectors = (ui, options) =>
  testingLibraryRender(ui, {
    wrapper: props => <TestProviders {...props} {...options?.wrapperProps} />,
    ...options
  })
/* eslint-enable */

export default renderInjectors
