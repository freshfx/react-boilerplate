import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import {ReactReduxContext} from 'react-redux'

import getInjectors from './reducerInjectors'

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 * @return {component} given component with reducer
 *
 */
export default ({key, reducer}) => WrappedComponent => {
  class ReducerInjector extends React.Component {
    constructor(props, context) {
      super(props, context)

      getInjectors(context.store).injectReducer(key, reducer)
    }

    static WrappedComponent = WrappedComponent

    static displayName = `withReducer(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`

    static contextType = ReactReduxContext

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent)
}
