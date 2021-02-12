/**
 * Asynchronously loads the component for FeaturePage
 */
import React from 'react'

import PageLoadingIndicator from 'components/molecules/PageLoadingIndicator'
import withLoadable from 'utils/withLoadable'

export default withLoadable(() => import('./index'), {
  fallback: <PageLoadingIndicator />
})
