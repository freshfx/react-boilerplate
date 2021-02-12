/**
 * Asynchronously loads the component for HomePage
 */
import React from 'react'

import LoadingIndicator from 'components/atoms/LoadingIndicator'
import withLoadable from 'utils/withLoadable'

export default withLoadable(() => import('./index'), {
  fallback: <LoadingIndicator />
})
