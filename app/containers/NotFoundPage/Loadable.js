/**
 * Asynchronously loads the component for NotFoundPage
 */
import React from 'react'

import LoadingIndicator from 'components/LoadingIndicator'
import withLoadable from 'utils/withLoadable'

export default withLoadable(() => import('./index'), {
  fallback: <LoadingIndicator />
})
