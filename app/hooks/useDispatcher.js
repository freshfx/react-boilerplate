import {useDispatch} from 'react-redux'
import {useCallback} from 'react'

const useDispatcher = ({action, dependencies = []}) => {
  const dispatch = useDispatch()
  return useCallback((...args) => dispatch(action(...args)), [
    dispatch,
    ...dependencies
  ])
}

export default useDispatcher
