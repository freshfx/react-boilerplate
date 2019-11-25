import React from 'react'
import uuid from 'uuid/v4'

import ActionSubscriptionContext from './context'

const withActionSubscription = Component =>
  class WithActionSubscription extends React.Component {
    constructor(props) {
      super(props)

      this.subscribers = []
      this.actionSubscription = null
      this.identifier = uuid()
    }

    componentWillUnmount() {
      this.clearSubscribers()
    }

    addSubscriber = (actionType, subscriber) => {
      this.subscribers.push(actionType)
      this.actionSubscription.addSubscriber(actionType, subscriber, this.identifier)
    }

    removeSubscriber = actionType => {
      this.subscribers = this.subscribers.filter(subscriber => subscriber !== actionType)
      this.actionSubscription.removeSubscriber(actionType, this.identifier)
    }

    clearSubscribers = () => {
      this.subscribers.forEach(action => {
        this.actionSubscription.removeSubscriber(action, this.identifier)
      })
    }

    renderComponent = actionSubscription => {
      this.actionSubscription = actionSubscription

      return (
        <Component
          {...this.props} // eslint-disable-line react/jsx-props-no-spreading
          actionSubscription={{
            ...actionSubscription,
            addSubscriber: this.addSubscriber,
            removeSubscriber: this.removeSubscriber
          }}
        />
      )
    }

    render() {
      return (
        <ActionSubscriptionContext.Consumer>
          {this.renderComponent}
        </ActionSubscriptionContext.Consumer>
      )
    }
  }

export default withActionSubscription
