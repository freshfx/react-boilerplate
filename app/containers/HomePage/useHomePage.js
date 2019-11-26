import {useInjectReducer} from 'redux-injectors'
import {
  useDispatch,
  useSelector
} from 'react-redux'

import reducer, {
  actions,
  selectors
} from 'modules/pages/home'

const useHomeEvents = () => {
  const dispatch = useDispatch()

  return {
    onChangeUsername: username =>
      dispatch(actions.changeUsername({username}))
  }
}

const useHomeState = () => ({
  username: useSelector(selectors.selectUsername)
})

const useHomePage = () => {
  useInjectReducer(reducer)

  const state = useHomeState()
  const events = useHomeEvents()

  return [
    state,
    events
  ]
}

export default useHomePage
