import React from 'react'
import {render} from '@testing-library/react'
import noop from 'lodash/noop'

import actionSubscription, {withActionSubscription} from '../index'

const actionEmitter = new actionSubscription.ActionEmitter()

const renderComponent = (...components) => {
  const withActionSubscriptionComponents = components.map(withActionSubscription)
  return render(
    <actionSubscription.Provider actionEmitter={actionEmitter}>
      {withActionSubscriptionComponents.map((Component, index) => <Component key={index} />)}
    </actionSubscription.Provider>
  )
}

describe('ActionSubscription', () => {
  it('should bar', () => {
    const action = 'ON_SUCCESS'
    const onSuccess = jest.fn()

    const component = props => {
      props.actionSubscription.addSubscriber(action, onSuccess)
      props.actionSubscription.addSubscriber('TO_DELETE', noop)
      props.actionSubscription.removeSubscriber('TO_DELETE')
      return null
    }

    expect(actionEmitter.subscriber).toBeNull()

    const {unmount} = renderComponent(component)

    expect(actionEmitter.subscriber).not.toBeNull()

    actionEmitter.emit(action)

    expect(onSuccess).toHaveBeenCalled()

    unmount()

    expect(actionEmitter.subscriber).toBeNull()
  })
})
