import ActionEmitter from '../ActionEmitter'

describe('ActionEmitter', () => {
  const instance = new ActionEmitter()

  describe('setSubscriber', () => {
    it('should set the passed subscriber', () => {
      const subscriber = 'subscriber'
      instance.setSubscriber(subscriber)
      expect(instance.subscriber).toBe(subscriber)
    })
  })

  describe('unsubscribe', () => {
    it('should set the subscriber to null', () => {
      instance.unsubscribe()
      expect(instance.subscriber).toBeNull()
    })
  })

  describe('emit', () => {
    it('should not throw if there is no subscriber', () => {
      expect(instance.emit).not.toThrow()
    })

    it('should call the subscriber with the passed actionType', () => {
      const subscriber = jest.fn()
      const actionType = 'actionType'
      instance.setSubscriber(subscriber)
      instance.emit(actionType)
      expect(subscriber).toHaveBeenCalledWith(actionType)
    })
  })
})
