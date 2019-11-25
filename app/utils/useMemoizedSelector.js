import {useMemo} from 'react'
import {useSelector} from 'react-redux'
import {is} from 'immutable'

const useMemoizedSelector = (selectorFactory, ownProps = {}, dependencies = []) => {
  const memoizedSelector = useMemo(selectorFactory, dependencies)
  return useSelector(state => memoizedSelector(state, ownProps), is)
}

export default useMemoizedSelector
