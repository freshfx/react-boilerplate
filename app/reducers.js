/*
 * Combine all reducers in this file and export the combined reducers.
 */

import {combineReducers} from 'redux-immutable'
import {connectRouter} from 'connected-react-router/immutable'
import globalReducer from 'containers/App/reducer'
import languageProviderReducer from 'containers/LanguageProvider/reducer'
import serviceReducer from 'services/reducer'

/*
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(history, injectedReducers) {
  return combineReducers({
    entities: serviceReducer,
    global: globalReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers
  })
}
