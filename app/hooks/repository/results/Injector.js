import {compose} from 'redux'
import {injectReducer, injectSaga} from 'redux-injectors'

import reducer, {saga} from 'modules/repository/results'

/**
 * The Injectors have to use the HOCs (injectReducer and injectSaga)
 * instead of the hooks (useInjectReducer and useInjectSaga) until this issue is fixed:
 * https://github.com/react-boilerplate/redux-injectors/issues/19
 */
const Blank = () => null
const RepositoryResultsInjector = compose(
  injectReducer(reducer),
  injectSaga(saga)
)(Blank)

export default RepositoryResultsInjector
