import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'
import isEmpty from 'lodash/isEmpty'
import ActionSubscriptionContext from './context'

class ActionSubscriptionProvider extends React.Component {
  constructor(props) {
    super(props)

    this.subscribers = {}
  }

  componentDidMount() {
    this.props.actionEmitter.setSubscriber(this.subscription)
  }

  componentWillUnmount() {
    this.props.actionEmitter.unsubscribe()
  }

  subscription = actionType => {
    if (this.subscribers[actionType]) {
      Object.values(this.subscribers[actionType])
        .forEach(subscriber => subscriber())
    }
  }

  getSubscribersForType = actionType => {
    if (this.subscribers[actionType]) {
      return this.subscribers[actionType]
    }
    return {}
  }

  addSubscriber = (actionType, subscriber, id = uuid()) => {
    const existingSubscribers = this.getSubscribersForType(actionType)
    this.subscribers[actionType] = {
      ...existingSubscribers,
      [id]: subscriber
    }
  }

  removeSubscriber = (actionType, identifier = null) => {
    if (identifier) {
      if (this.subscribers[actionType]) {
        delete this.subscribers[actionType][identifier]
        if (isEmpty(this.subscribers[actionType])) {
          delete this.subscribers[actionType]
        }
      }
    } else {
      delete this.subscribers[actionType]
    }
  }

  render() {
    const {addSubscriber, removeSubscriber} = this
    return (
      <ActionSubscriptionContext.Provider
        value={{
          addSubscriber,
          removeSubscriber
        }}
      >
        {this.props.children}
      </ActionSubscriptionContext.Provider>
    )
  }
}


ActionSubscriptionProvider.propTypes = {
  actionEmitter: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

export default ActionSubscriptionProvider
