import {useMemo} from 'react'
import {useSelector} from 'react-redux'

const useMemoizedSelector = (selectorFactory, ownProps = {}, dependencies = []) => {
  const memoizedSelector = useMemo(selectorFactory, dependencies)
  return useSelector(state => memoizedSelector(state, ownProps))
}

export default useMemoizedSelector
