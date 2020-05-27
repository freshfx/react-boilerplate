import {compose} from 'redux'
import {injectReducer} from 'redux-injectors'

import entitiesReducer from 'modules/entities'
import languageReducer from 'modules/language'

/**
 * The Injectors have to use the HOCs (injectReducer and injectSaga)
 * instead of the hooks (useInjectReducer and useInjectSaga) until this issue is fixed:
 * https://github.com/react-boilerplate/redux-injectors/issues/19
 */
const AppInjector = () => null

export default compose(
  injectReducer(entitiesReducer),
  injectReducer(languageReducer)
)(AppInjector)
