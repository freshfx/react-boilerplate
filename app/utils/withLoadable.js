import React, {
  Suspense
} from 'react'

const withLoadable = (importFunc, {fallback = null} = {}) => {
  const LazyComponent = React.lazy(importFunc)

  return function SuspendedComponent(props) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}

export default withLoadable
