import {fromJS} from 'immutable'

import languageProviderReducer from '../reducer'
import {CHANGE_LOCALE} from '../constants'

describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    /* eslint-disable-next-line no-undefined */
    expect(languageProviderReducer(undefined, {})).toEqual(fromJS({
      locale: 'en'
    }))
  })

  it('changes the locale', () => {
    /* eslint-disable-next-line no-undefined */
    expect(languageProviderReducer(undefined, {
      locale: 'de',
      type: CHANGE_LOCALE
    }).toJS()).toEqual({
      locale: 'de'
    })
  })
})
