import React from 'react'
import {shallow} from 'enzyme'

import withActionSubscription from '../withActionSubscription'

jest.mock('../Provider')

const renderComponent = () => {
  const TestComponent = withActionSubscription('div')
  return shallow(<TestComponent />)
}

const renderedComponent = renderComponent()
const instance = renderedComponent.instance()

describe('withActionSubscription', () => {
  it('should match the snapshot', () => {
    expect(renderedComponent).toMatchSnapshot()
  })

  describe('renderComponent', () => {
    const actionSubscription = {
      foo: 'bar'
    }

    it('should set the actionSubscription', () => {
      instance.renderComponent(actionSubscription)
      expect(instance.actionSubscription).toEqual(actionSubscription)
    })

    it('should return the correct child component', () => {
      const component = shallow(instance.renderComponent(actionSubscription))
      expect(component.type()).toEqual('div')
      const expectedProp = {
        ...actionSubscription,
        addSubscriber: instance.addSubscriber,
        removeSubscriber: instance.removeSubscriber
      }
      expect(component.prop('actionSubscription')).toEqual(expectedProp)
    })
  })

  describe('lifecycle events', () => {
    describe('componentWillUnmount', () => {
      it('should call instance.clearSubscribers', () => {
        const innerComponent = renderComponent()
        const innerInstance = innerComponent.instance()
        const clearSubscribers = jest.spyOn(innerInstance, 'clearSubscribers')
        innerComponent.unmount()
        expect(clearSubscribers).toHaveBeenCalled()
      })
    })
  })

  describe('instance', () => {
    const addSubscriber = jest.fn()
    const removeSubscriber = jest.fn()
    const actionSubscription = {addSubscriber, removeSubscriber}

    beforeEach(() => {
      addSubscriber.mockClear()
      removeSubscriber.mockClear()
      instance.actionSubscription = actionSubscription
    })

    describe('addSubscriber', () => {
      it('should add the passed actionType to the subscribers array', () => {
        const actionType = 'actionType'
        const subscriber = jest.fn()
        instance.addSubscriber(actionType, subscriber)
        expect(instance.subscribers.includes(actionType)).toBeTruthy()
      })

      it('should call the addSubscriber method of the actionSubscription prop', () => {
        const actionType = 'actionType'
        const subscriber = jest.fn()
        instance.addSubscriber(actionType, subscriber)
        expect(addSubscriber).toHaveBeenCalledWith(actionType, subscriber, instance.identifier)
      })
    })

    describe('clearSubscribers', () => {
      it('should call the removeSubscriber method of the actionSubscription ' +
          'prop for every subscriber', () => {
        instance.subscribers = []

        const actionTypeFoo = 'foo'
        const actionTypeBar = 'bar'
        instance.addSubscriber(actionTypeFoo)
        instance.addSubscriber(actionTypeBar)

        instance.clearSubscribers()
        expect(removeSubscriber)
          .toHaveBeenCalledWith(actionTypeFoo, instance.identifier)
        expect(removeSubscriber)
          .toHaveBeenCalledWith(actionTypeBar, instance.identifier)
      })
    })

    describe('removeSubscriber', () => {
      it('should remove the passed actionType from the subscribers array', () => {
        const subscriber = 'foo'
        const expectedResult = ['bar']
        instance.subscribers = [subscriber, ...expectedResult]
        instance.removeSubscriber(subscriber)
        expect(instance.subscribers).toEqual(expectedResult)
      })

      it('should call actionSubscription.removeSubscriber with the ' +
          'actionType and the instances identifier', () => {
        const actionType = 'actionType'
        instance.removeSubscriber(actionType)
        expect(removeSubscriber).toHaveBeenCalledWith(actionType, instance.identifier)
      })
    })
  })
})
