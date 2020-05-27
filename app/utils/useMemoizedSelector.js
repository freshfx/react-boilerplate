import {useMemo} from 'react'
import {useSelector} from 'react-redux'

const useMemoizedSelector = (selectorFactory, ownProps = {}, equalityFn) => {
  const memoizedSelector = useMemo(selectorFactory, [])
  return useSelector(state => memoizedSelector(state, ownProps), equalityFn)
}

export default useMemoizedSelector
