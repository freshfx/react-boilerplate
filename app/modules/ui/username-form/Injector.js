import {compose} from 'redux'
import {injectReducer} from 'redux-injectors'

import reducer from 'modules/ui/username-form/index'

/**
 * The Injectors have to use the HOCs (injectReducer and injectSaga)
 * instead of the hooks (useInjectReducer and useInjectSaga) until this issue is fixed:
 * https://github.com/react-boilerplate/redux-injectors/issues/19
 */
const Blank = () => null
const UsernameFormInjector = compose(injectReducer(reducer))(Blank)

export default UsernameFormInjector
