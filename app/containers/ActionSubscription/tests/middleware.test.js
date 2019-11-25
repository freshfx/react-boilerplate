import middleware from '../middleware'

const nextResult = 'nextResult'
const emit = jest.fn()
const next = jest.fn(action => `${nextResult}/${action}`)
const actionEmitter = {emit}

const execute = (action, emitter = null) => middleware(emitter)()(next)(action)

describe('ActionSubscription', () => {
  describe('middleware', () => {
    beforeEach(() => {
      emit.mockClear()
      next.mockClear()
    })

    it('should call next with the passed action', () => {
      const action = 'action'
      execute(action)
      expect(next).toHaveBeenCalledWith(action)
    })

    it('should return the result of next(action)', () => {
      const action = 'action'
      expect(execute(action)).toEqual(`${nextResult}/${action}`)
    })

    it('should emit on the passed actionEmitter', () => {
      const type = 'type'
      const action = {type}
      execute(action, actionEmitter)
      expect(emit).toHaveBeenCalledWith(type)
    })
  })
})
