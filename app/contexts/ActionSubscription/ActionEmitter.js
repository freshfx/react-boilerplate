class ActionEmitter {
  constructor() {
    this.subscriber = null
  }

  setSubscriber = subscriber => {
    this.subscriber = subscriber
  }

  unsubscribe = () => {
    this.subscriber = null
  }

  emit = actionType => {
    /* istanbul ignore else */
    if (this.subscriber) {
      this.subscriber(actionType)
    }
  }
}

export default ActionEmitter
