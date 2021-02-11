import {createSlice} from '@reduxjs/toolkit'
import deepFreeze from 'deep-freeze'

const initialState = deepFreeze({
  username: ''
})

const name = 'homePage'
const {actions, reducer} = createSlice({
  initialState,
  name,
  reducers: {
    changeUsername: (state, action) => {
      const {username} = action.payload
      state.username = username.replace(/@/gi, '') // eslint-disable-line require-unicode-regexp
    }
  }
})

export {actions, initialState, name, reducer}

export default {
  key: name,
  reducer
}
