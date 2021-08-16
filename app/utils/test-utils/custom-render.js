import React from 'react'
import PropTypes from 'prop-types'
import {IntlProvider} from 'react-intl'
import {Provider} from 'react-redux'
import {render as testingLibraryRender} from '@testing-library/react'
import {HelmetProvider} from 'react-helmet-async'

import ActionSubscription from 'contexts/ActionSubscription'

const ConditionalReduxProvider = ({children, store}) => {
  if (store) {
    return <Provider store={store}>{children}</Provider>
  }
  return children
}

const TestProviders = ({actionEmitter, children, store}) => {
  const content = (
    <ConditionalReduxProvider store={store}>
      <IntlProvider locale="en">
        <HelmetProvider>{children}</HelmetProvider>
      </IntlProvider>
    </ConditionalReduxProvider>
  )

  if (actionEmitter) {
    return (
      <ActionSubscription.Provider actionEmitter={actionEmitter}>
        {content}
      </ActionSubscription.Provider>
    )
  }

  return content
}

TestProviders.propTypes = {
  actionEmitter: PropTypes.any,
  children: PropTypes.node.isRequired,
  store: PropTypes.shape({dispatch: PropTypes.func.isRequired})
}

TestProviders.defaultProps = {
  actionEmitter: null,
  store: null
}

/* eslint-disable react/display-name, react/jsx-props-no-spreading */
const render = (ui, options) =>
  testingLibraryRender(ui, {
    wrapper: props => <TestProviders {...props} {...options?.wrapperProps} />,
    ...options
  })
/* eslint-enable */

export default render
