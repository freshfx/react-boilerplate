import {createSlice} from '@reduxjs/toolkit'
import deepFreeze from 'deep-freeze'

import {DEFAULT_LOCALE} from '../../i18n'

const initialState = deepFreeze({
  locale: DEFAULT_LOCALE
})

const name = 'language'
const {reducer, ...slice} = createSlice({
  initialState,
  name,
  reducers: {
    changeLocale: (state, action) => {
      const {locale} = action.payload
      state.locale = locale
    }
  }
})

const actions = {
  changeLocale: slice.actions.changeLocale
}

export {actions, initialState, name, reducer}

export default {
  key: name,
  reducer
}
