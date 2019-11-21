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
    const {[actionType]: subscribers = {}} = this.subscribers
    Object.values(subscribers).forEach(subscriber => subscriber())
  }

  addSubscriber = (actionType, subscriber, id = uuid()) => {
    const {[actionType]: existingSubscribers = {}} = this.subscribers
    this.subscribers[actionType] = {
      ...existingSubscribers,
      [id]: subscriber
    }
  }

  removeSubscriber = (actionType, identifier) => {
    if (this.subscribers[actionType]) {
      delete this.subscribers[actionType][identifier]
      if (isEmpty(this.subscribers[actionType])) {
        delete this.subscribers[actionType]
      }
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
