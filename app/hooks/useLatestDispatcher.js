import {useDispatch} from 'react-redux'
import {useCallback, useRef} from 'react'

const useLatestDispatcher = ({action, dependencies = []}) => {
  const dispatch = useDispatch()
  const thunkReference = useRef(null)

  return useCallback(
    (...args) => {
      thunkReference.current?.abort?.()
      thunkReference.current = dispatch(action(...args))
      return thunkReference.current
    },
    [dispatch, ...dependencies]
  )
}

export default useLatestDispatcher
