import React from 'react'
import {shallow} from 'enzyme'
import uuid from 'uuid/v4'

import ActionSubscriptionContext from '../context'
import Provider from '../Provider'

const actionEmitter = {
  setSubscriber: jest.fn(),
  unsubscribe: jest.fn()
}

const defaultProps = {
  actionEmitter
}

const Child = () => <div />

const renderComponent = (props = {}) =>
  shallow(<Provider {...defaultProps} {...props}><Child /></Provider>)

const renderedComponent = renderComponent()
const instance = renderedComponent.instance()

describe('<ActionSubscription.Provider />', () => {
  beforeEach(() => {
    renderedComponent.setProps(defaultProps)
  })

  it('should match the snapshot', () => {
    expect(renderedComponent).toMatchSnapshot()
  })

  it('should render a <ActionSubscriptionContext.Provider /> component', () => {
    expect(renderedComponent.type()).toEqual(ActionSubscriptionContext.Provider)
  })

  it('should add the instance.addSubscriber and instance.removeSubscriber ' +
      'to the rendered component', () => {
    expect(renderedComponent.prop('value').addSubscriber)
      .toEqual(instance.addSubscriber)
    expect(renderedComponent.prop('value').removeSubscriber)
      .toEqual(instance.removeSubscriber)
  })

  describe('lifecycle events', () => {
    describe('componentDidMount', () => {
      it('should call the setSubscriber method of the actionEmitter prop', () => {
        actionEmitter.setSubscriber.mockClear()
        const {subscription} = renderComponent().instance()
        expect(actionEmitter.setSubscriber).toHaveBeenCalledWith(subscription)
      })
    })

    describe('componentWillUnmount', () => {
      it('should call the unsubscribe method of the actionEmitter prop', () => {
        actionEmitter.unsubscribe.mockClear()
        renderComponent().unmount()
        expect(actionEmitter.unsubscribe).toHaveBeenCalled()
      })
    })
  })

  describe('instance', () => {
    const actionType = 'actionType'

    describe('addSubscriber', () => {
      it('should set the passed subscriber on the instance.subscribers object', () => {
        const subscriber = 'subscriber'
        const identifier = uuid()
        instance.addSubscriber(actionType, subscriber, identifier)
        expect(instance.subscribers[actionType]).toEqual({[identifier]: subscriber})
      })
    })

    describe('removeSubscriber', () => {
      it('should remove a subscriber from the instance.subscribers object', () => {
        instance.removeSubscriber(actionType)
        expect(instance.subscribers[actionType]).toBeUndefined()
      })

      it('should remove a passed identifier', () => {
        const identifier = uuid()
        const expectedResult = {
          [actionType]: {[uuid()]: jest.fn()}
        }
        instance.subscribers = {
          [actionType]: {
            ...expectedResult[actionType],
            [identifier]: jest.fn()
          }
        }

        instance.removeSubscriber(actionType, identifier)
        expect(instance.subscribers).toEqual(expectedResult)
      })

      it('should remove the actionType if there are not more subscribers', () => {
        const identifier = uuid()
        instance.subscribers = {
          [actionType]: {
            [identifier]: jest.fn()
          }
        }

        instance.removeSubscriber(actionType, identifier)
        expect(instance.subscribers[actionType]).toBeUndefined()
      })

      it('should be able to handle non existent actionTypes', () => {
        const testFn = () => instance.removeSubscriber('baz', 'identifier')
        expect(testFn).not.toThrow()
      })
    })

    describe('subscription', () => {
      it('should not call a subscriber with a non matching actionType', () => {
        const subscriber = jest.fn()
        instance.addSubscriber('bar', subscriber)
        instance.subscription('foo')
        expect(subscriber).not.toHaveBeenCalled()
        instance.removeSubscriber('bar')
      })

      it('should call a matching subscriber', () => {
        const subscriber = jest.fn()
        instance.addSubscriber(actionType, subscriber)
        instance.subscription(actionType)
        expect(subscriber).toHaveBeenCalled()
      })
    })

    describe('getSubscribersForType', () => {
      it('should return an empty object if there are no subscribers for ' +
          'the passed actionType', () => {
        expect(instance.getSubscribersForType('foo')).toEqual({})
      })

      it('should return the subscribers of a passed actionType', () => {
        const subscribers = {key: jest.fn()}
        instance.subscribers = {[actionType]: {...subscribers}}
        expect(instance.getSubscribersForType(actionType)).toEqual(subscribers)
      })
    })
  })
})
