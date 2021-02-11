import {createSlice} from '@reduxjs/toolkit'
import deepFreeze from 'deep-freeze'

import {DEFAULT_LOCALE} from '../../i18n'

const initialState = deepFreeze({
  locale: DEFAULT_LOCALE
})

const name = 'language'
const {actions, reducer} = createSlice({
  initialState,
  name,
  reducers: {
    changeLocale: (state, action) => {
      const {locale} = action.payload
      state.locale = locale
    }
  }
})

export {actions, initialState, name, reducer}

export default {
  key: name,
  reducer
}
